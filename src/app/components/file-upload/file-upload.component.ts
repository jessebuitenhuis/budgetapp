import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent {
  @ViewChild("inputEl", { static: true }) inputEl!: ElementRef<
    HTMLInputElement
  >;

  @Input() text: string = "Upload file";
  @Input() accept: string = "";

  @Output() uploaded = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();

  uploading = false;

  constructor() {}

  openFileBrowser(): void {
    this.inputEl.nativeElement.click();
  }

  onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const fileList = target && target.files;
    const file = fileList && fileList.item(0);
    if (!file) {
      return this.error.emit("No file found.");
    }

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.uploading = false;
      const result = fileReader.result as string;
      if (!result) {
        return this.error.emit("No file found.");
      }
      this.uploaded.emit(result);
    };

    fileReader.onloadstart = () => {
      this.uploading = true;
    };

    fileReader.readAsText(file);
  }
}
