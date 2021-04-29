let listData;
let mainlist = document.querySelector('.main ul');
let maintitle = document.querySelector('.main-title');

//從網站讀出JSON,並存入listData
let data = new XMLHttpRequest();
data.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
data.send(null);
data.onload = function(){
        listData = JSON.parse(data.responseText).result.records; 
        updatedropdown();
}

//代入listDate的Zone至下拉選單
function updatedropdown(){
    let str = '<option value="">--請選擇行政區--</option>';
    const set = new Set();
    const result = listData.filter(item => !set.has(item.Zone) ? set.add(item.Zone) : false);
    let len = result.length;
    for(let i = 0; i < len; i++){
        str += '<option value="'+result[i].Zone+'">'+result[i].Zone+'</option>'   
    }
    document.querySelector('.dropdown').innerHTML = str;      
}

//點擊下拉選單後更新main
document.querySelector('.dropdown').addEventListener('change',changedropdown);
document.querySelector('.hot-text').addEventListener('click',changedropdown);

function changedropdown(e){
    let area = e.target.value;
    let len = listData.length;
    let str = '';
    for(let i = 0; i < len; i++){
        if(area==listData[i].Zone){
        str+='<li><div style="background-image:url('+listData[i].Picture1+');"><h2>'+listData[i].Name+'</h2><p>'+listData[i].Zone+'</p></div><p><img src="/images/icons_clock.png" alt="">'+listData[i].Opentime+'</p><p><img src="/images/icons_pin.png" alt="">'+listData[i].Add+'</p><p><img src="/images/icons_phone.png" alt="">'+listData[i].Tel+'</p><p class="label"><img src="/images/icons_tag.png" alt="">'+listData[i].Ticketinfo+'</p></li>';  
        }      
    }
    maintitle.textContent = area;
    mainlist.innerHTML = str;   
};





