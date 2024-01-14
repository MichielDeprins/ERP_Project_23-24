sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/f/library", // Remove the duplicate import
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "../util/SortAndFilterHelper",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
  ],

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    fioriLibrary,
    Device,
    JSONModel,
    SortAndFilterHelper,
    Spreadsheet,
    exportLibrary
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
      onNavToSales: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("sales");
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
      onExport: function (oEvent) {
        let aCols, oRowBinding, oSettings, oSheet, oTable;

        oTable = this.getView().byId("MaterialTable");
        oRowBinding = oTable.getBinding("items");
        aCols = this.createColumnConfig();

        oSettings = {
          workbook: {
            columns: aCols,
            hierarchyLevel: "Level",
          },
          dataSource: oRowBinding,
          fileName: "Materials_Table.xlsx",
          worker: false, // We need to disable worker because we are using a MockServer as OData Service
        };

        oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },
      createColumnConfig: function () {
        let aCols = [];
        let EdmType = exportLibrary.EdmType;

        aCols.push({
          label: "Material Number",
          property: ["Matnr"],
          type: EdmType.String,
        });

        aCols.push({
          label: "Material Description",
          type: EdmType.String,
          property: "Maktx",
          scale: 0,
        });

        aCols.push({
          label: "Material Group",
          type: EdmType.String,
          property: "Matkl",
          scale: 0,
        });

        aCols.push({
          label: "Material Type",
          type: EdmType.String,
          property: "Mtart",
          scale: 0,
        });
        aCols.push({
          label: "Industry Sector",
          type: EdmType.String,
          property: "Mbrsh",
          scale: 0,
        });

        return aCols;
      },
    });
  }
);
