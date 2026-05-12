let obituaries = [];

async function init() {
    try {
        const response = await fetch('data.json');
        obituaries = await response.json();
        renderObituaries(obituaries);
        
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', handleSearch);
        
        setupModal();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('obituary-grid').innerHTML = '<div class="loader">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    }
}

function renderObituaries(data) {
    const grid = document.getElementById('obituary-grid');
    
    if (data.length === 0) {
        grid.innerHTML = '<div class="loader">검색 결과가 없습니다.</div>';
        return;
    }
    
    grid.innerHTML = data.map(item => `
        <div class="obituary-card" onclick="showDetail(${item.id})">
            <div class="card-header">
                <h2 class="card-name">${item.name}</h2>
                <span class="card-date">별세: ${item.diedDate}</span>
            </div>
            <div class="card-info">
                <span class="info-label">장소</span>
                <span class="info-value">${item.place}</span>
            </div>
            <div class="card-info">
                <span class="info-label">발인</span>
                <span class="info-value">${item.funeralDate}</span>
            </div>
        </div>
    `).join('');
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = obituaries.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.family.toLowerCase().includes(term) ||
        item.burialPlace.toLowerCase().includes(term)
    );
    renderObituaries(filtered);
}

function showDetail(id) {
    const item = obituaries.find(o => o.id === id);
    if (!item) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-detail-header">
            <h2 class="card-name" style="font-size: 2rem;">고 ${item.name} 님</h2>
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

document.addEventListener('DOMContentLoaded', init);
