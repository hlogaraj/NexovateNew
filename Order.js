export default class Order {
    BranchPlant;
    Originator;
    SupplierAddressNumber;
    ApprovalRouteCode;
    BaseCurr;
    CurCod;
    F_D;
    RequestDate;
    ForeignOpenAmount;
    OrderAmount;
    SupplierName;
    DaysOld;
    OrTy;
    OrderNumber;
    Person;
    OrderCo;
    Note;
    Responsible;
    AddressNumber;
    OrderDate;
    HdCD;

    constructor(data) {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid JSON object provided');
        }
        this.BranchPlant = data.BranchPlant || '';
        this.Originator = data.Originator || '';
        this.SupplierAddressNumber = data.SupplierAddressNumber || 0;
        this.ApprovalRouteCode = data.ApprovalRouteCode || '';
        this.BaseCurr = data.BaseCurr || 'USD';
        this.CurCod = data.CurCod || '';
        this.F_D = data.F_D || '';
        this.RequestDate = data.RequestDate || '';
        this.ForeignOpenAmount = data.ForeignOpenAmount || 0.00;
        this.OrderAmount = data.OrderAmount || 0.00;
        this.SupplierName = data.SupplierName || '';
        this.DaysOld = data.DaysOld || '';
        this.OrTy = data.OrTy || '';
        this.OrderNumber = data.OrderNumber || 0;
        this.Person = data.Person || 0;
        this.OrderCo = data.OrderCo || '';
        this.Note = data.Note || '';
        this.Responsible = data.Responsible || '';
        this.AddressNumber = data.AddressNumber || 0;
        this.OrderDate = data.OrderDate || '';
        this.HdCD = data.HdCD || '';
        this.data = data;
    }


    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get BranchPlant() {
        return this._BranchPlant;
    }

    set BranchPlant(value) {
        this._BranchPlant = value;
    }

    get Originator() {
        return this._Originator;
    }

    set Originator(value) {
        this._Originator = value;
    }

    get SupplierAddressNumber() {
        return this._SupplierAddressNumber;
    }

    set SupplierAddressNumber(value) {
        this._SupplierAddressNumber = value;
    }

    get ApprovalRouteCode() {
        return this._ApprovalRouteCode;
    }

    set ApprovalRouteCode(value) {
        this._ApprovalRouteCode = value;
    }

    get BaseCurr() {
        return this._BaseCurr;
    }

    set BaseCurr(value) {
        this._BaseCurr = value;
    }

    get CurCod() {
        return this._CurCod;
    }

    set CurCod(value) {
        this._CurCod = value;
    }

    get F_D() {
        return this._F_D;
    }

    set F_D(value) {
        this._F_D = value;
    }

    get RequestDate() {
        return this._RequestDate;
    }

    set RequestDate(value) {
        this._RequestDate = value;
    }

    get ForeignOpenAmount() {
        return this._ForeignOpenAmount;
    }

    set ForeignOpenAmount(value) {
        this._ForeignOpenAmount = value;
    }

    get OrderAmount() {
        return this._OrderAmount;
    }

    set OrderAmount(value) {
        this._OrderAmount = value;
    }

    get SupplierName() {
        return this._SupplierName;
    }

    set SupplierName(value) {
        this._SupplierName = value;
    }

    get DaysOld() {
        return this._DaysOld;
    }

    set DaysOld(value) {
        this._DaysOld = value;
    }

    get OrTy() {
        return this._OrTy;
    }

    set OrTy(value) {
        this._OrTy = value;
    }

    get OrderNumber() {
        return this._OrderNumber;
    }

    set OrderNumber(value) {
        this._OrderNumber = value;
    }

    get Person() {
        return this._Person;
    }

    set Person(value) {
        this._Person = value;
    }

    get OrderCo() {
        return this._OrderCo;
    }

    set OrderCo(value) {
        this._OrderCo = value;
    }

    get Note() {
        return this._Note;
    }

    set Note(value) {
        this._Note = value;
    }

    get Responsible() {
        return this._Responsible;
    }

    set Responsible(value) {
        this._Responsible = value;
    }

    get AddressNumber() {
        return this._AddressNumber;
    }

    set AddressNumber(value) {
        this._AddressNumber = value;
    }

    get OrderDate() {
        return this._OrderDate;
    }

    set OrderDate(value) {
        this._OrderDate = value;
    }

    get HdCD() {
        return this._HdCD;
    }

    set HdCD(value) {
        this._HdCD = value;
    }
}