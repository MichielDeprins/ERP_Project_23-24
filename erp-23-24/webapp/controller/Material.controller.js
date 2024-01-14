sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, fioriLibrary) {
    "use strict";
    return Controller.extend("erp2324.controller.Material", {
      onInit: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("main")
          .attachPatternMatched(this._onMaterialMatched, this);
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onMaterialMatched, this);
      },
      _onMaterialMatched: function (oEvent) {
        let oTable = this.getView().byId("manufacturerTable");
        let sMaterialID = oEvent.getParameter("arguments").materialParam || "0";
        this.getView().bindElement({
          path: `/MaterialSet('${sMaterialID}')`,
        });
        console.log("otable: " + oTable);
        oTable.bindItems({
          path: `/MaterialSet('${sMaterialID}')/ManufacturerSet`,
          template: oTable.getItems()[0].clone(),
        });
      },

      ButtonToMaterials: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("main");
      },

      onExit: function () {
        this.oRouter
          .getRoute("list")
          .detachPatternMatched(this._onProductMatched, this);
        this.oRouter
          .getRoute("detail")
          .detachPatternMatched(this._onProductMatched, this);
      },
    });
  }
);
