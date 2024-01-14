sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";
    return Controller.extend("erp2324.controller.Sales", {
      onInit: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("sales")
          .attachPatternMatched(this._onSaleMatched, this);
        oRouter
          .getRoute("saleItem")
          .attachPatternMatched(this._onSaleMatched, this);
      },
      _onSaleMatched: function (oEvent) {
        let oTable = this.getView().byId("SaleItemTable");
        let sSaleID = oEvent.getParameter("arguments").SaleParam || "0";

        // Bind the items directly in the controller
        oTable.bindItems({
          path: `/SaleSet('${sSaleID}')/SaleItemSet`,
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.ObjectIdentifier({ title: "{Vbeln}" }),
              new sap.m.Text({ text: "{Posnr}" }),
              new sap.m.Text({ text: "{Matnr}" }),
              new sap.m.Text({ text: "{Arktx}" }),
              new sap.m.Text({ text: "{Matkl}" }),
            ],
          }),
        });
      },
    });
  }
);
