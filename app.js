let allData = [];

async function init() {
    try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data.json?v=${new Date().getTime()}`);
        allData = await response.json();
        
        renderUnifiedTable(allData);
        setupModals();
        setupExportButtons();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function getAmountValue(item) {
    if (!item || !item.id) return 200000;
    const id = item.id;
    if (id === 9 || id === 13) return 150000;
    return 200000;
}

function formatNumber(num) {
    return num.toLocaleString();
}

function renderUnifiedTable(data) {
    const container = document.getElementById('main-table-container');
    const titleElement = document.getElementById('total-count-title');
    if (!container) return;
    
    if (data.length === 0) {
        container.innerHTML = '<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>';
        return;
    }

    // Sort by date
    const sortedData = [...data].sort((a, b) => {
        const dateA = a.type === 'wedding' ? a.dateTime : a.diedDate;
        const dateB = b.type === 'wedding' ? b.dateTime : b.diedDate;
        return new Date(dateA.replace(/-/g, '/')) - new Date(dateB.replace(/-/g, '/'));
    });

    if (titleElement) {
        const weddings = data.filter(i => i.type === 'wedding').length;
        const obituaries = data.filter(i => i.type === 'obituary').length;
        titleElement.textContent = `전체 경비 내역 - 총 ${data.length}건 (결혼 ${weddings}건, 장례 ${obituaries}건)`;
    }

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th>이름</th>
                    <th style="width: 100px;">경조사</th>
                    <th>일시</th>
                    <th>관계</th>
                    <th>장소</th>
                    <th style="text-align: right;">금액</th>
                    <th>비고</th>
                    <th style="width: 60px; text-align: center;">첨부</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalSum = 0;

    sortedData.forEach((item, index) => {
        const amount = getAmountValue(item);
        totalSum += amount;
        
        const dateStr = item.type === 'wedding' ? item.dateTime : item.diedDate;
        const typeLabel = item.type === 'wedding' ? '결혼식' : '장례식';
        const nameDisplay = item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name;
        const location = item.type === 'wedding' ? item.location : item.place;
        
        // Construct Remarks (비고)
        let remarks = "";
        if (item.type === 'obituary') {
            remarks = `${item.genderAge || ''} | 발인: ${item.funeralDate?.split(' ')[0] || ''}`;
        } else {
            remarks = "결혼 축하금";
        }

        const attachmentHtml = item.attachment 
            ? `<span class="attachment-icon" onclick="event.stopPropagation(); showImage('${item.attachment}')" title="증빙 서류 보기">📎</span>` 
            : '-';

        tableHtml += `
            <tr onclick="showDetail(${item.id})">
                <td style="text-align: center; color: var(--toss-text-muted);">${index + 1}</td>
                <td style="font-weight: 700; color: var(--toss-text-main);">${nameDisplay}</td>
                <td style="font-weight: 600; color: ${item.type === 'wedding' ? 'var(--toss-blue)' : '#F04452'};">${typeLabel}</td>
                <td>${dateStr}</td>
                <td>${item.relation || '-'}</td>
                <td>${location}</td>
                <td style="text-align: right; font-weight: 700; color: var(--toss-text-main);">${formatNumber(amount)}</td>
                <td style="font-size: 13px; color: var(--toss-text-muted);">${remarks}</td>
                <td style="text-align: center;">${attachmentHtml}</td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
            <tfoot>
                <tr class="table-footer-row">
                    <td colspan="6" style="text-align: right; font-weight: 600; color: var(--toss-text-muted);">통합 경비 합계</td>
                    <td style="text-align: right; font-weight: 800; color: var(--toss-blue); font-size: 17px;">${formatNumber(totalSum)}원</td>
                    <td colspan="2"></td>
                </tr>
            </tfoot>
        </table>`;

    container.innerHTML = tableHtml;
    
    // Update total summary card
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) totalAmountElement.textContent = formatNumber(totalSum) + '원';
    
    renderImageGallery(data);
}

function renderImageGallery(data) {
    const galleryContainer = document.getElementById('image-gallery');
    if (!galleryContainer) return;
    
    const baseUrl = import.meta.env.BASE_URL || '/';
    const itemsWithImages = data.filter(item => item.attachment);
    
    if (itemsWithImages.length === 0) {
        galleryContainer.innerHTML = '<p style="color: var(--toss-text-muted);">첨부된 증빙 서류가 없습니다.</p>';
        return;
    }
    
    galleryContainer.innerHTML = itemsWithImages.map(item => `
        <div class="gallery-item" onclick="showImage('${item.attachment}')">
            <div class="gallery-image-wrapper">
                <img src="${baseUrl}${item.attachment}" alt="${item.name || item.groom}" loading="lazy">
            </div>
            <div class="gallery-info">
                <div class="gallery-name">${item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name}</div>
                <div class="gallery-date">${item.type === 'wedding' ? item.dateTime : item.diedDate}</div>
            </div>
        </div>
    `).join('');
}

function setupExportButtons() {
    const excelBtn = document.getElementById('export-excel');
    const pdfBtn = document.getElementById('export-pdf');
    if (!excelBtn || !pdfBtn) return;

    excelBtn.onclick = () => {
        const dataForExcel = allData.map((item, index) => {
            const amount = getAmountValue(item);
            return {
                '번호': index + 1,
                '성명/대상': item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name,
                '유형': item.type === 'wedding' ? '결혼' : '장례',
                '일시': item.type === 'wedding' ? item.dateTime : item.diedDate,
                '관계': item.relation,
                '장소': item.type === 'wedding' ? item.location : item.place,
                '금액': amount,
                '비고': item.type === 'obituary' ? `${item.genderAge} | 발인: ${item.funeralDate}` : '결혼 축하'
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "사업필요경비");
        XLSX.writeFile(workbook, "2025_사업_필요_경비.xlsx");
    };

    pdfBtn.onclick = () => {
        const element = document.getElementById('app');
        const opt = {
            margin: 10,
            filename: '2025_사업_필요_경비.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };
}

function showDetail(id) {
    const item = allData.find(o => o.id === id);
    if (!item) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const amountVal = getAmountValue(item);
    
    if (item.type === 'wedding') {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name">${item.groom} ♡ ${item.bride}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value" style="color: var(--toss-blue);">결혼 | ${item.relation}</span>
                </div>
                <div>
                    <span class="info-label">일시</span>
                    <span class="info-value">${item.dateTime}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장소</span>
                <span class="info-value">${item.location}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">금액</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${formatNumber(amountVal)}원</span>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name">${item.name}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value">부고 | ${item.genderAge} | ${item.relation}</span>
                </div>
                <div>
                    <span class="info-label">별세일</span>
                    <span class="info-value">${item.diedDate}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">금액</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${formatNumber(amountVal)}원</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">유가족</span>
                <span class="info-value">${item.family}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">빈소</span>
                <span class="info-value">${item.place}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">발인일시</span>
                <span class="info-value">${item.funeralDate}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장지</span>
                <span class="info-value">${item.burialPlace}</span>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showImage(filename) {
    const imageModal = document.getElementById('image-modal');
    const popupImage = document.getElementById('popup-image');
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    popupImage.src = `${baseUrl}${filename}`;
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function setupModals() {
    const modal = document.getElementById('modal');
    const imageModal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close-button');
    const closeImageBtn = document.getElementById('close-image');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    if (closeImageBtn) {
        closeImageBtn.onclick = () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target == imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}

window.showDetail = showDetail;
window.showImage = showImage;
document.addEventListener('DOMContentLoaded', init);
