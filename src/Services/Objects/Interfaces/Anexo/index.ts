type BlobPart = BufferSource | Blob | string;
type BufferSource = ArrayBufferView | ArrayBuffer;
type EndingType = "native" | "transparent";
interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
  }
  
  declare var File: {
    prototype: File;
    new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
  }
  
  interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
  }
  
  interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
  }
export default interface Anexo {
    classificacao: number;
    arquivo: string;
    descricao: string;
    extensao: string;

    _submetidoAAssinatura?: boolean | undefined;
    _Impresso?: boolean | undefined;
    _file?: File | null | undefined;
}