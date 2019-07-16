// Storage Controller

//Item Controller
const itemCtrl = (function() {
    const Item = function(id,name,calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
            {id:0, name:'Steak Dinnerr', calories:1200},
            {id:1, name:'Cookie', calories:400},
            {id:2, name:'Eggs', calories:300},
        ],
        currentItem: null,
        totalCalories:0
    }

return {
    getItems: function() {
        return data.items;
    },
    addItem:function(name,calories){
        let ID;
        if(data.items.length > 0) {
            ID = data.items[data.items.length-1].id + 1;
        } else {
            ID = 0;
        }

        calories = parseInt(calories);
        newItem = new Item (ID,name,calories);
        data.items.push (newItem);
        return newItem;
    },
    logDate: function(){
        return data;
    }
}
})();

//UI Controller
const uiCtrl = (function() {
    const uiSelectors = {
        itemList:'#item-list',
        addBtn:'.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }
    return {
        populateItemLists: function(items){
            let html = '';
            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}:</strong> <em>${item.calories} calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>`;
            });
            document.querySelector(uiSelectors.itemList).innerHTML = html;
        },
        getIteminput: function (){
            return {
                name: document.querySelector(uiSelectors.itemNameInput.value),
                calories:document.querySelector(uiSelectors.itemCaloriesInput.value)
            }
        },
        addListItem: function(item) {
            const li = document.createElement('li');
            li.className = "collection=item";
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} calories</em>
                            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            document.querySelector(uiSelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        getSelectors: function(){
            return uiSelectors;
        }
    }
})();

//App Controller
const appCtrl = (function(itemCtrl,uiCtrl) {
    const loadEventListeners = function () {
        const uiSelectors = uiCtrl.getSelectors();
        document.querySelector(uiSelectors.addBtn).addEventListener('click',itemAddSubmit);

    }

    const itemAddSubmit = function(e){
        const input = uiCtrl.getIteminput();
        if(input.name !== '' && input.calories !== '') {
            const newItem = itemCtrl.addItem(input.name,input.calories);
            uiCtrl.addListItem(newItem);
        }
    }

    return {
        init: function() {
            const items = itemCtrl.getItems();
            uiCtrl.populateItemLists(items);

            loadEventListeners();
        }
    }
})(itemCtrl,uiCtrl);

appCtrl.init();