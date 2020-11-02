var searchNameList = [
    { name: 'Supplier name search', value: '0' },
    { name: 'Address search', value: '1' },
    { name: 'My first search', value: '2' },
    { name: 'Search 20200920', value: '3' },
    { name: 'Temp Search', value: '4' },
    { name: 'Better search by city', value: '5' },
  ];
  
  var testdata = [
    {
      name: 'placeHolder',
      section: 'right',
    },
    {
      name: 'Overview',
      section: 'left',
    },
    {
      name: 'ByFunction',
      section: 'left',
    },
    {
      name: 'Time',
      section: 'left',
    },
    {
      name: 'allFit',
      section: 'left',
    },
    {
      name: 'allbMatches',
      section: 'left',
    },
    {
      name: 'allOffers',
      section: 'left',
    },
    {
      name: 'allInterests',
      section: 'left',
    },
    {
      name: 'allResponses',
      section: 'left',
    },
    {
      name: 'divChanged',
      section: 'right',
    },
  ];
  
  var dsSearchOption = kendo.observable({
    selectedValue: '1',
    id: 'radiogroupTitleSearchOption',
    selectedValue: '1',
    id: 'radiogroupTitleSearchOption',
    items: [
      { caption: 'Contains', value: '0' },
      { caption: 'Exact Match', value: '1' },
      { caption: 'Start With', value: '2' },
      { caption: 'End With', value: '3' },
      { caption: 'EINECS', value: '4' },
    ],
    onSelectItem: function (e) {
      debugger;
      alert('save ' + e.currentTarget.innerText);
    },
    onDeleteItem: function (e) {
      debugger;
      //var index = testdata.findIndex(obj => obj.name=="allInterests");
  
      //alert('delete ' + e.currentTarget.id);
      var testdata = this.get('items');
      var datastring = JSON.stringify(testdata);
      var itemObj = JSON.parse(datastring);
      var index = itemObj.findIndex((obj) => obj.caption == 'End With');
      itemObj.splice(index, 1);
    },
  });
  
  //kendo.bind($('#searchTitleOptionDiv'), dsSearchOption);
  
  var ogDialog = $('#optionGroupTest').optiongroup({
    itemList: searchNameList,
    selectItemCallBack: function (itemName) {
      kendo.alert('Call back function to select item: ' + itemName);
    },
    deleteItemCallBack: function (itemName) {
      kendo.alert('Call back function to delete item: ' + itemName);
    },
    newItemCallBack: function (itemName) {
      kendo.alert('Call back function to add item: ' + itemName);
    },
  });
  
  //See this
  //https://demos.telerik.com/kendo-ui/listbox/mvvm
  //https://demos.telerik.com/kendo-ui/listview/mvvm
  //https://demos.telerik.com/kendo-ui/listbox/templates?_ga=2.64796588.267261909.1602976079-128699120.1598984922
  //https://docs.telerik.com/kendo-ui/knowledge-base/listbox-how-to-filter-items
  //Remove Item
  //https://demos.telerik.com/kendo-ui/listbox/api?_ga=2.262459407.267261909.1602976079-128699120.1598984922
  
  var listBinModel = kendo.observable({
    change: function (e) {
      debugger;
      var element = e.sender.select();
      //alert(element[0]);
      var thisBox = $('#listbin').data('kendoListBox');
      thisBox.remove(element);
      //var dataItem = e.sender.dataItem(element[0]);
  
      //https://docs.telerik.com/kendo-ui/knowledge-base/listbox-how-to-filter-items
      //https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/methods/remove
    },
    dataBound: function (e) {
      //Console.log('event: dataBound');
    },
    reorder: function (e) {
      //Console.log('event: reorder');
    },
    remove: function (e) {
      //Console.log('event: remove');
    },
    items: searchNameList,
  });
  
  kendo.bind($('#example'), listBinModel);
  