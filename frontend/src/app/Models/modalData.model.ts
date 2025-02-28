export class ModalData {
    modalText:    string;
    modalMode:    boolean;
    modalData:    any;
   // collection:   Object[];

  constructor(modalText: string, modalMode: boolean, modalData: any){
        this.modalText = modalText;
        this.modalMode = modalMode;
        this.modalData = modalData;
     //   this.collection = collection;
    }
}

