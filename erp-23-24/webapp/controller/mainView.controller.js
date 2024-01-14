sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/f/library", // Remove the duplicate import
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "../util/SortAndFilterHelper",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Text",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/TextArea",
  ],

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    fioriLibrary,
    Device,
    JSONModel,
    Fragment,
    SortAndFilterHelper,
    Dialog,
    List,
    StandardListItem,
    Button,
    ButtonType,
    Label,
    Input,
    Text,
    VBox,
    HBox,
    TextArea
  ) {
    "use strict";

    return Controller.extend("erp2324.controller.mainView", {
      onInit: function () {
        this._mViewSettingsDialogs = {};
      },
      onListItemPress: function (oEvent) {
        let sMaterialPath = oEvent.getSource().getBindingContext().getPath(),
          oSelectedMaterial = sMaterialPath.split("'")[1];
        this.getOwnerComponent().getRouter().navTo("detail", {
          layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          materialParam: oSelectedMaterial,
        });
      },

      handleSorterButtonPressed: function () {
        SortAndFilterHelper.handleSortButtonPressed(
          this,
          "erp2324.fragments.sortDialog"
        );
      },
      handleSortDialogConfirm: function (oEvent) {
        SortAndFilterHelper.handleSortDialogConfirm(
          oEvent,
          this,
          "MaterialTable"
        );
      },

      handleFilterButtonPressed: function () {
        SortAndFilterHelper.handleFilterButtonPressed(
          this,
          "erp2324.fragments.filterDialog"
        );
      },

      handleFilterDialogConfirm: function (oEvent) {
        SortAndFilterHelper.handleFilterDialogConfirm(
          oEvent,
          this,
          "MaterialTable"
        );
      },

      getViewSettingsDialog: function (sDialogFragmentName) {
        var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

        if (!pDialog) {
          pDialog = Fragment.load({
            id: this.getView().getId(),
            name: sDialogFragmentName,
            Controller: this,
          }).then(function (oDialog) {
            if (Device.system.desktop) {
              oDialog.addStyleClass("sapUI5SizeCompact");
            }
            return oDialog;
          });
          this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
        }
        return pDialog;
      },
      handleSortDialogConfirm: function (oEvent) {
        var oTable = this.byId("MaterialTable"),
          mParams = oEvent.getParameters(),
          oBinding = oTable.getBinding("MATNR"),
          sPath,
          bDescending,
          aSorters = [];

        sPath = mParams.sortItem.getKey();
        bDescending = mParams.sortDescending;
        aSorters.push(new Sorter(sPath, bDescending));

        // apply the selected sort and group settings
        oBinding.sort(aSorters);
      },
      handleFilterDialogConfirm: function (oEvent) {
        var oTable = this.byId("MaterialTable"),
          mParams = oEvent.getParameters(),
          oBinding = oTable.getBinding("MATNR"),
          aFilters = [];

        mParams.filterItems.forEach(function (oItem) {
          let sPath = oItem.getParent().getKey(),
            sOperator = "EQ",
            sValue1 = oItem.getKey(),
            oFilter = new Filter(sPath, sOperator, sValue1);
          aFilters.push(oFilter);
        });

        // apply filter settings
        oBinding.filter(aFilters);
      },
    });
  }
);
