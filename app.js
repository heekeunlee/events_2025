let obituaries = [];

async function init() {
    try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data.json`);
        obituaries = await response.json();
        renderObituaries(obituaries);
        
        setupModal();
    } catch (error) {
        console.error('Error loading data:', error);
        const body = document.getElementById('obituary-body');
        if (body) {
            body.innerHTML = '<tr><td colspan="8" class="loader">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>';
        }
    }
}

function renderObituaries(data) {
    const body = document.getElementById('obituary-body');
    if (!body) return;
    
    if (data.length === 0) {
        body.innerHTML = '<tr><td colspan="8" class="loader">검색 결과가 없습니다.</td></tr>';
        return;
    }
    
    body.innerHTML = data.map(item => `
        <tr onclick="showDetail(${item.id})">
            <td>${item.id}</td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${item.category}</td>
            <td style="font-weight: 600;">${item.name}</td>
            <td>${item.genderAge}</td>
            <td>${item.diedDate}</td>
            <td>${item.funeralDate}</td>
            <td>${item.place}</td>
            <td>${item.burialPlace}</td>
        </tr>
    `).join('');
}



function showDetail(id) {
    const item = obituaries.find(o => o.id === id);
    if (!item) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-detail-header">
            <h2 class="card-name" style="font-size: 2rem;">${item.name}</h2>
            <p class="card-date" style="margin-bottom: 5px;">${item.category} | ${item.genderAge}</p>
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

