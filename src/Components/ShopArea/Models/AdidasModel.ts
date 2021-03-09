class AdidasModel {
    public adidasId: number;
    public price: number;
    public stock: number;
    public imageName: string;

    // Image property for sending an image to the server.
    // <input type="file" /> bring us list of files, thus the FileList type.
    // public image: FileList;
}

export default AdidasModel;