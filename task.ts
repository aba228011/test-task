interface IItem {
    id: number | string;
    parent: number | string;
    type?: string | null;
}

interface ITreeStore {
    getAll(): Array<IItem>;
    getItem(id: number | string): IItem | undefined; 
    getChildren(parentId: number | string): Array<IItem> | [];
    getAllChildren(parentId: number | string): Array<IItem> | [];
    getAllParents(id: number | string): Array<IItem> | [];
}


class TreeStore implements ITreeStore {
    inputData: Array<IItem>;
   
    constructor(inputData: Array<IItem>) {
      this.inputData = inputData;
    }
   
    getAll() : Array<IItem> {
      return this.inputData;
    }

    getItem(id: number | string) : IItem | undefined {
        return this.inputData.find((el: IItem) => el.id === id);
    }

    getChildren(parentId: number | string) : Array<IItem> | [] {
        return this.inputData.filter((el: IItem) => el.parent === parentId);
    }

    getAllChildren(parentId: number | string) : Array<IItem> | [] {
        return this.getChildList(parentId, this.inputData);
    }

    getChildList(parentId: number | string, inputDataList: Array<IItem>) : Array<IItem> | [] {
        let result: any = [];
        inputDataList.forEach((el: IItem) => {
            if (el.parent === parentId) {
                result.push(el)
                result = [...result, ...this.getChildList(el.id, this.inputData)]; 
            }
        });
        return result;
    }

    getAllParents(id: number | string) : Array<IItem> | [] {
        return this.getParentList(id, this.inputData);
    }

    getParentList(id: number | string, inputDataList: Array<IItem>) : Array<IItem> | [] {
        let result: any = [];
        inputDataList.forEach((el: IItem) => {
            if (el.id === id) {
                inputDataList.forEach((el2: IItem) => {
                    if (el2.id === el.parent) {
                        result.push(el2)
                        result = [...result, ...this.getParentList(el2.id, this.inputData)]; 
                    }
                });
            } 
        });
        return result;
    }
}

const items : Array<IItem> = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));

 















