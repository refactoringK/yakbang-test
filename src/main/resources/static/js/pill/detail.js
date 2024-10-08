// 쿼리스트링 가져오기
let mySearch = window.location.search
let urlSearchParams = new URLSearchParams(mySearch);
// 주소창의 id 파라미터 값만 뽑아오기
let itemSeq = urlSearchParams.get("id");


getReviews(itemSeq, 1, displayReviews);


{  // 탭
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const reviewTab = document.querySelector('.tab-link.active');


    tabLinks.forEach((tabLink, index) => {
        tabLink.addEventListener('click', () => {
            tabContents.forEach((tabContent, i) => {
                if (i === index) {
                    tabContent.style.display = 'block';
                } else {
                    tabContent.style.display = 'none';
                }
            });

            tabLinks.forEach(link => {
                link.classList.remove('active');
            });
            tabLink.classList.add('active');

            // 리뷰 탭 클릭 시 getReviews 함수 호출
            if (tabLink === reviewTab) {
                getReviews(itemSeq, 1, displayReviews);
            }
        });
    });

    // Default tab
    if(tabContents && tabContents[0]) {
        tabContents[0].style.display = 'block';
    }
    tabLinks[0]?.classList.add('active');
}

function getReviews(itemSeq, page, callback) {
    fetch(`/reviews?itemSeq=${itemSeq}&page=${page}`)
        .then(response => response.json())
        .then(list => {
            console.log(list);
            if(callback) {
                callback(list);
            }
            displayReviewCount(list.length);
        })
        .catch(error => console.error('오류!', error));
}

function displayReviews(list){
    let $dataContainer = document.querySelector('#data-container');
    let html = ``;

    list.forEach(dto => {
        html += `
         <li class="review-content">
            <div class="user-info">
                    <span class="user-name">${dto.name}</span>
                    <span class="user-agegender">
                        ${dto.reviewAge}대 / ${dto.reviewGender === 'M' ? '남자' : '여자'}
                    </span>
            </div>
            <div class="review-info-row1">
                    <div class="rating-box">
                        <div class="rating-select" style="width: ${dto.point * 20}%; "></div>
                    </div>
            </div>
            <div class="review-full-txt">
                    ${dto.reviewContent}
            </div>
        </li>
        `;
    });


    let oldHtml = $dataContainer.innerHTML;
    $dataContainer.innerHTML = oldHtml + html;
}

function displayReviewCount(count) {
    let reviewCountElement = document.querySelector('.review-cnt');
    reviewCountElement.textContent = `리뷰 ${count}개`;
}


