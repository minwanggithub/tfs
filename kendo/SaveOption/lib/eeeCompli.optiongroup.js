//==============================================================================================
//Min Wang: 09/25/2020 -- Note ----
//Dropdown Option Group using datasource
//It depends on kendo UI and Bootstrap 2.0
//==============================================================================================

(function ($, kdo) {
    $.fn.optiongroup = function (options) {
      options = options || {}; //make sure options is not null, or can extend to define default options
      var $this = $(this);
      var confirmDialogWind, criteriaModel;
  
      if ($(this).length > 1) {
        kendo.alert('Single instance allowed, please refine your selector.');
        return;
      }
  
      //kendo.alert("Constructing " + $this[0].id);
      var settings = $.extend(
        {
          itemList: null,
          selectItemCallBack: null,
          deleteItemCallBack: null,
          newItemCallBack: null,
        },
        options
      );
  
      function getBindingObservable(dataSource) {
        return kdo.observable({
          selectedValue: '-1',
          id: 'radiogroupTitleSearchOption',
          // items: [
          //   { name: 'Supplier name search', value: '0' },
          //   { name: 'Address search', value: '1' },
          //   { name: 'My first search', value: '2' },
          //   { name: 'Search 20200920', value: '3' },
          //   { name: 'Temp Search', value: '4' },
          //   { name: 'Better search by city', value: '5' },
          // ],
  
          items: settings.itemList,
          //Use Custom Action Icons: https://docs.telerik.com/kendo-ui/controls/layout/window/how-to/use-custom-action-icons
          //https://demos.telerik.com/kendo-ui/window/actions
          onSaveOptionClick: function (e) {
            e.stopPropagation();
            //kendo.alert("Save Option Clicked");
            //openSizableDialog();
            openSaveDialog();
          },
  
          onOptionItemSelect: function (e) {
            e.stopPropagation();
            var foundItem = this.get('items').find(
              (item) => item.name == e.target.innerText
            );
            this.set('selectedValue', foundItem.value);
            //kendo.alert("Item Clicked: " + foundItem.value);
            //kendo.alert("Item Clicked: " + e.target.innerText);
          },
  
          onOptionItemDelete: function (e) {
            e.stopPropagation();
            debugger;
            var data = this.get('items');
            var datastring = JSON.stringify(data);
            var itemObj = JSON.parse();
            var itemIndex = itemObj
              .map((c) => c.caption.indexOf(e.target.innerText))
              .find((i) => i >= 0);
            //var index = this.get("items").findIndex(obj => obj.caption == e.target.innerText);
  
            //kendo.alert("Delete " + e.currentTarget.id);
            $.when(
              showConfirmationDialog(
                'Are you sure you want to delete this item: ' + e.currentTarget.id
              )
            ).then(function (confirmed) {
              if (confirmed) {
                debugger;
                //var foundItem = this.get("items").find(item => item.caption == e.target.innerText);
  
                //itemList = itemList.splice({ caption: e.target.innerText }, 1);
                var index = itemList.findIndex(
                  (obj) => obj.caption == e.target.innerText
                );
                if (index > 0) {
                  //this.get("items").remove(index);
                }
                if ($.isFunction(settings.deleteItemCallBack)) {
                  settings.deleteItemCallBack.call(this, e.currentTarget.id);
                }
              }
              //else {
              //    //alert('No');
              //}
            });
          },
        });
      }
  
      function openSizableDialog() {
        var saveWnd = $("<div id='testSizableWindow'/>")
          //.appendTo("body")
          .kendoWindow({
            actions: ['Close', 'maximize', 'minimize', 'Refresh', 'restore'],
            //width: "200px",
            resize: function () {
              //alert('resized');
            },
            restore: function () {
              //alert('restored');
            },
            maximize: function () {
              //alert('maximized');
            },
            refresh: function () {
              //alert('refresh');
            },
            title: 'Save Confirmation',
            minWidth: 600,
            modal: true,
            visible: false,
            close: function (e) {
              this.destroy();
            },
          });
  
        saveWnd.data('kendoWindow').content($('#Send-Email-Content').html());
  
        //Dynamic passing content
        // $('#SaveMessage').html(
        //   'Save Structure Layout will be inserted here.'
        // );
  
        saveWnd.data('kendoWindow').center().open();
  
        saveWnd.find('.save-ok').click(function () {
          saveWnd.data('kendoWindow').close();
        });
      }
  
      function getSaveSelectNameObservable() {
        return kendo.observable({
          selectedSearchName: "NewSearchName",
          change: function (e) {
            var element = e.sender.select();
            var dataItem = e.sender.dataItem(element[0])
            this.set("selectedSearchName", dataItem.name);
  
            selectedSearchName = dataItem.name;
            //var thisBox = $('#nameList').data('kendoListBox');
            //thisBox.remove(element);
          },
          items: searchNameList,
        });
      }
  
      function openSaveDialog() {
        var saveWnd = $("<div id='SaveItemWindow'/>")
          //.appendTo("body")
          .kendoWindow({
            actions: ['Close', 'maximize', 'minimize', 'Refresh'],
            //width: "200px",
            resize: function () {
              //alert('resized');
            },
            maximize: function () {
              //alert('maximized');
            },
            refresh: function () {
              //alert('refresh');
            },
            title: 'Save Confirmation',
            minWidth: 600,
            modal: true,
            visible: false,
            close: function (e) {
              this.destroy();
            },
          });
  
        saveWnd.data('kendoWindow').content($('#Save-Option-Content').html());
  
        //Dynamic passing content
        // $('#SaveMessage').html(
        //   'Save Structure Layout will be inserted here.'
        // );
  
        saveWnd.data('kendoWindow').center().open();
  
        saveWnd.find('.save-ok').click(function () {
          saveWnd.data('kendoWindow').close();
        });
        saveWnd.find('.save-cancel').click(function () {
          saveWnd.data('kendoWindow').close();
        });
  
  
        //Find events
        //https://demos.telerik.com/kendo-ui/listbox/events
        // var saveListCtl = saveWnd.find('#nameList').kendoListBox({
        //   dataSource: {
        //     // data: [
        //     //   { name: 'Jane Doe' },
        //     //   { name: 'John Doe' }
        //     //   ]
        //     data: settings.itemList,
        //   },
        //   template: '<div>#:name#</div>',
        //   change: function (e) {},
        // });
        // // get a reference to the list box widget
        // var listBox = saveListCtl.data('kendoListBox');
        // // selects first list box item
        // listBox.select(listBox.items().first());
  
      var saveContentModel = getSaveSelectNameObservable();
        kendo.bind($('#SaveOptionContent'), saveContentModel);
      }
  
      function showConfirmationDialog(message) {
        return ConfirmationDialog('#delete-confirmation', message);
      }
  
      function ConfirmationDialog(templateName, message) {
        var dfd = new jQuery.Deferred();
        var result = false;
  
        var deleteConfirmPopUpWnd = $("<div id='popupWindow'/>")
          //.appendTo("body")
          .kendoWindow({
            width: '200px',
            title: 'Delete Confirmation',
            modal: true,
            visible: false,
            close: function (e) {
              this.destroy();
              dfd.resolve(result);
            },
          });
  
        deleteConfirmPopUpWnd.data('kendoWindow').content($(templateName).html());
        $('#deleteConfirmationMessage').html(message);
  
        deleteConfirmPopUpWnd.data('kendoWindow').center().open();
  
        deleteConfirmPopUpWnd.find('.delete-confirm').click(function () {
          result = true;
          deleteConfirmPopUpWnd.data('kendoWindow').close();
          return dfd.promise();
        });
  
        deleteConfirmPopUpWnd.find('.delete-cancel').click(function () {
          deleteConfirmPopUpWnd.data('kendoWindow').close();
          return dfd.promise();
        });
  
        return dfd.promise();
      }
  
      function Init() {
        var confirmDialogTemplate = $(
          "<script id='delete-confirmation' type='text/x-kendo-template'>" +
            "<p id='deleteConfirmationMessage'>Are you sure?</p><hr><br/>" +
            "<button class='delete-cancel k-button btn pull-right'>No</button>" +
            "<button class='delete-confirm k-button btn pull-right' style='margin-right:5px;'>Yes</button>" +
            '</script>'
        );
  
        //var optionGroupTemplate = $("<script id='groupOption-template' type='text/x-kendo-template'>" +
        //    "<div><span class='k-icon k-i-check'></span><label data-bind='text:caption, events: { click: onOptionItemSelect }' class='option-group-item-label' title='Load'></label><span class='k-icon k-i-trash option-item-delete'></span></div></script>");
        var optionGroupTemplate = $(
          "<script id='groupOption-template' type='text/x-kendo-template'>" +
            "<table><tr><td><input type='radio' data-bind='attr:{name:id, value:value}, checked:selectedValue' style='margin-left:5px;' /></td>" +
            "<td><span class='k-icon k-i-trash option-item-delete' title='Delete' data-bind='attr:{id:caption}, events: { click: onOptionItemDelete }'></span></td>" +
            "<td><label data-bind='text:name, events: { click: onOptionItemSelect }' class='option-group-item-label' title='Load'></label></td></tr></table></script>"
        );
        //var optionGroupTemplate = $("<script id='groupOption-template' type='text/x-kendo-template'><div><span class='k-icon k-i-check pull-left' style='padding-top:3px; vertical-align: bottom'></span><label data-bind='text:caption, events: { click: onOptionItemSelect }' class='option-group-item-label' title='Load'></label><span class='k-icon k-i-close option-item-delete' data-bind='attr:{id:caption}, events: { click: onOptionItemDelete }' title='Delete'></span></div></script>");
        //var optionGroupTemplate = $("<script id='groupOption-template' type='text/x-kendo-template'><div><input type='radio' data-bind='attr:{name:id, value:value}, checked:selectedValue' /><label data-bind='text:caption' class='radio-label'></label></div></script>");
        var btnGroup = $("<div class='btn-group'></div>");
        var saveBtn = $(
          "<button id='saveQueryBtn' data-bind='click: onSaveOptionClick' class='k-button btn btn-small'><span class='k-icon k-i-save'></span>&nbsp;Save</button>"
        );
        var optionDDBtn = $(
          "<button id='optionDropDown' class='k-button dropdown-toggle' style='height:24px;' data-toggle='dropdown' title='Save Option'><span class='caret'></span></button>"
        );
        var groupOptionPulldown = $(
          "<div class='dropdown-menu pull-left' id='groupOptionItemDiv'><div data-bind='source:items' data-template='groupOption-template'></div></div>"
        );
  
        //btnGroup.append(saveBtn, [optionDDBtn, groupOptionPulldown]);
        btnGroup.append(confirmDialogTemplate);
        btnGroup.append(optionGroupTemplate, [
          saveBtn,
          optionDDBtn,
          groupOptionPulldown,
        ]);
  
        $this.append(btnGroup);
  
        criteriaModel = getBindingObservable();
  
        kdo.bind(btnGroup, criteriaModel);
  
        //confirmDialogWind = $("<div />").kendoWindow({
        //    title: "Delete Confirmation",
        //    resizable: false,
        //    modal: true
        //});
        //confirmDialogWind.data("kendoWindow").content($("#delete-confirmation").html());
  
        //confirmDialogWind.find(".delete-confirm,.delete-cancel")
        //    .click(function () {
        //        if ($(this).hasClass("delete-confirm")) {
        //            alert("Implement deleting...");
        //            confirmDialogWind.data("kendoWindow").close();
        //            return true;
        //        }
  
        //    });
      }
  
      Init();
    };
  })(jQuery, kendo);
  