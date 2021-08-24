import { Component } from '@angular/core';

// @ts-ignore
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xlsDemo';

  // 0: {id: 27, sysName: "rowIndex", name: "№ п/п", width: 60, active: true, …}
// 1: {id: 28, sysName: "pictureName", name: "Название", width: 150, active: true, …}
// 2: {id: 29, sysName: "createDate", name: "Дата создания", width: 150, active: true, …}

  columns = [
    { prop: 'id', name: "№ п/п" },
    { prop: 'pictureName', name: "Название" },
    { prop: 'createDate', name: "Дата создания" }
  ];

  // rows = [];



  rows = [
    {id: "MkKv+QNK050Mt1okjBU/gA==", pictureName: "IE11.tiff", createDate: "03.03.2021 09:00", downloadUri: "129,6c134fbd5612"},
    {id: "/T8Is7/EamuMfWwKvc0X4w==", pictureName: "imagetopdf.pdf", createDate: "03.03.2021 09:02", downloadUri: "133,6c145a9713f0"},
    {id: "tRmsP5pz9Y+4N/g8qzVmlg==", pictureName: "ico.ico", createDate: "03.03.2021 09:04", downloadUri: "131,6c15bc11c456"},
    {id: "DSegax1/sEGhmZ9wKRYKJg==", pictureName: "IE11.png", createDate: "03.03.2021 14:36", downloadUri: "129,6c56fa444766"}
  ];

  //  функция экспорта в Excel

  public onExportXLS() {

    // 0: {id: 27, sysName: "rowIndex", name: "№ п/п", width: 60, active: true, …}
// 1: {id: 28, sysName: "pictureName", name: "Название", width: 150, active: true, …}
// 2: {id: 29, sysName: "createDate", name: "Дата создания", width: 150, active: true, …}
//
//     columns = [
//       { prop: 'id', name: "№ п/п" },
//       { prop: 'pictureName', name: "Название" },
//       { prop: 'createDate', name: "Дата создания" }
//     ];

    const columns = this.columns.map(column => {
      // @ts-ignore
      delete column['id'];
      return  column;
    })

    this.exportAsExcelFile(this.columns, this.rows, '');
  }


  public exportAsExcelFile(columns: any, rows: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.makeJson(columns, rows));
    this.setColumnWidth(worksheet, columns);

    const workbook: XLSX.WorkBook = { Sheets: { 'Экспорт данных': worksheet }, SheetNames: ['Экспорт данных'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, (fileName ? fileName + '_' : '') + 'export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private makeJson(columns: any, rows: any) {
    const json = [];

    console.log('col: ', columns);
    console.log('rows:', rows);

    for (const col of columns) {
      col.maxLength = col['name'].length + 1;
    }

    for (const row of rows) {
      const jsonRow = {};

      for (const col of columns) {
        // if (col.visible) {
        const field = col['prop'],
          label = col['name'];

        // @ts-ignore
        jsonRow[label] = row[field];
        col.maxLength = Math.max(row[field] ? row[field].length : 0, col.maxLength);
        // }
      }

      json.push(jsonRow);
    }

    return json;
  }

  private setColumnWidth(worksheet: any, columns: any) {
    worksheet['!cols'] = [];
    for (const col of columns) {
      if (col.visible) {

        if (col['width']) {
          worksheet['!cols'].push({
            wpx: col.width ? col.width : 150
          });
        } else {
          worksheet['!cols'].push({
            wch: col.maxLength
          });
        }
      }
    }
  }


  // tslint:disable-next-line:typedef
  // public testFunc(data: any) {
  //   console.log(data);
  //   try {
  //     //  собственно вызов
  //     // @ts-ignore
  //     this[data.func1]();
  //   }
  //   catch {
  //     console.error(`${data.func1} is not a method ${this.constructor.name}`);
  //   }
  // }
  //
  // //  обработчик на входе
  // public callMe(fnName: HTMLInputElement): void {
  //   //  получаем название в название функции
  //   const fn = `${fnName.value}`.trim();
  //   //  собственно вызов - если накосячат названием сработает трай катч
  //   try {
  //     //  собственно вызов
  //     // @ts-ignore
  //     this[fn]();
  //   }
  //   catch {
  //     console.error(`${fn} is not a method ${this.constructor.name}`);
  //   }
  // }
  //
  // //  тестовая функция для проверки
  // private test1(): void {
  //   console.warn('is OK!');
  // }
  //
  // //  тестовая функция для проверки
  // private test2(): void {
  //   console.warn('is OK!');
  // }








}

