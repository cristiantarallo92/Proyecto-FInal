export class ModalData {
    modalTitle:    string;
    modalMode :    boolean;
    modalData:     any;
    modalItem:     string; 

  constructor(modalText: string, modalMode: boolean, modalData: any, typeData:string){
        this.modalTitle =  modalText;
        this.modalMode  =  modalMode;
        this.modalData  =  modalData;
        this.modalItem  =  typeData;
    }
}

