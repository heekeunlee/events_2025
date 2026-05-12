let allData = [];

async function init() {
    try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data.json`);
        allData = await response.json();
        
        renderSections(allData);
        setupModal();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderSections(data) {
    const weddingContainer = document.getElementById('wedding-container');
    const obituaryContainer = document.getElementById('obituary-container');
    
    // Split data
    const weddings = data.filter(item => item.type === 'wedding');
    const obituaries = data.filter(item => item.type === 'obituary');
    
    renderMonthlyTables(weddings, weddingContainer, '경사');
    renderMonthlyTables(obituaries, obituaryContainer, '조사');
}

function renderMonthlyTables(items, container, typeLabel) {
    if (items.length === 0) {
        container.innerHTML = '<p class="loader">데이터가 없습니다.</p>';
        return;
    }

    // Group by month
    const groups = {};
    items.forEach(item => {
        const dateStr = item.type === 'wedding' ? item.dateTime : item.diedDate;
        // Extract month (assuming YYYY-MM or YYYY년 MM월)
        const match = dateStr.match(/(\d{4})[-년]\s*(\d{1,2})/);
        const month = match ? `${match[1]}년 ${parseInt(match[2])}월` : '기타';
        
        if (!groups[month]) groups[month] = [];
        groups[month].push(item);
    });

    // Sort months (simplified)
    const sortedMonths = Object.keys(groups).sort((a, b) => {
        const aVal = a.match(/(\d+)년\s+(\d+)월/);
        const bVal = b.match(/(\d+)년\s+(\d+)월/);
        if (!aVal || !bVal) return 0;
        return (parseInt(aVal[1]) * 100 + parseInt(aVal[2])) - (parseInt(bVal[1]) * 100 + parseInt(bVal[2]));
    });

    container.innerHTML = sortedMonths.map(month => `
        <div class="month-group">
            <h3 class="month-title">${month}</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>구분</th>
                            <th>${typeLabel === '경사' ? '신랑 ♡ 신부' : '고인명'}</th>
                            <th>성별/연령</th>
                            <th>${typeLabel === '경사' ? '결혼식 일시' : '별세일'}</th>
                            <th>${typeLabel === '경사' ? '장소' : '장례식장/빈소'}</th>
                            <th>관계</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${groups[month].map(item => `
                            <tr onclick="showDetail(${item.id})">
                                <td>${item.id}</td>
                                <td style="font-weight: 600; color: ${item.type === 'wedding' ? '#e67e22' : '#7f8c8d'};">${item.typeLabel}</td>
                                <td style="font-weight: 600;">${item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name}</td>
                                <td>${item.type === 'wedding' ? '-' : item.genderAge}</td>
                                <td>${item.type === 'wedding' ? item.dateTime : item.diedDate}</td>
                                <td>${item.type === 'wedding' ? item.location : item.place}</td>
                                <td style="color: var(--accent-color); font-weight: 500;">${item.relation || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `).join('');
}

function showDetail(id) {
    const item = allData.find(o => o.id === id);
    if (!item) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (item.type === 'wedding') {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name" style="font-size: 2rem;">${item.groom} ♡ ${item.bride}</h2>
                <p class="card-date" style="margin-bottom: 5px;">${item.typeLabel} | ${item.relation}</p>
                <p class="card-date" style="margin-bottom: 30px;">일시: ${item.dateTime}</p>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장소</span>
                <span class="info-value" style="font-size: 1.1rem;">${item.location}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">비고</span>
                <span class="info-value" style="font-size: 1.1rem;">많은 축하 부탁드립니다.</span>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name" style="font-size: 2rem;">${item.name}</h2>
                <p class="card-date" style="margin-bottom: 5px;">${item.typeLabel} | ${item.genderAge} | ${item.relation}</p>
                <p class="card-date" style="margin-bottom: 30px;">별세일: ${item.diedDate}</p>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">유가족</span>
                <span class="info-value" style="font-size: 1.1rem;">${item.family}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">빈소</span>
                <span class="info-value" style="font-size: 1.1rem;">${item.place}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">발인일시</span>
                <span class="info-value" style="font-size: 1.1rem;">${item.funeralDate}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장지</span>
                <span class="info-value" style="font-size: 1.1rem;">${item.burialPlace}</span>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-button');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}

window.showDetail = showDetail;
document.addEventListener('DOMContentLoaded', init);
