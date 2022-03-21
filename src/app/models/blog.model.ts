export class Blog{
    _id:string;
    title:string;
    coverImage:string;
    description:string;
    createdAt:string;
    updatedAt:string;
    tags:[String];
    author:{
        username:string,
        avatar:string
    }

    constructor(option:any){
        this._id = option._id || null;
        this.tags = option.tags || [];
    }
}