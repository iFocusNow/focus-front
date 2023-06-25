import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditBlockperiodComponent } from '../edit-blockperiod/edit-blockperiod.component';

export interface LinkExt {
  id: string;
  name: string;
  url: string;
  device_id: string;
  blockperiod_id: string;
  blockperiod: {
    id: string;
    is_monday: boolean;
    is_tuesday: boolean;
    is_wednesday: boolean;
    is_thursday: boolean;
    is_friday: boolean;
    is_saturday: boolean;
    is_sunday: boolean;
  };
}

const LinkData: LinkExt[] = [
  {
    id: "b5c11a-80ae-4eba-b074-0777c52e10f7",
    device_id: "b67c1e87-0316-45fc-a947-91d4b6a7dacf",
    blockperiod_id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
    blockperiod: {
      id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
    name: 'Reddit',
    url: 'https://www.reddit.com/',
  },
  {
    id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
    device_id: "b67c1e87-0316-45fc-a947-91d4b6a7dacf",
    blockperiod_id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
    blockperiod: {
      id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
    name: 'Twitter',
    url: 'https://twitter.com/',
  },
  {
    id: "45e38852-a228-4317-9e6e-cda83ae13800",
    device_id: "b67c1e87-0316-45fc-a947-91d4b6a7dacf",
    blockperiod_id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
    blockperiod: {
      id: "a7db40df-3662-47e8-bf45-b675b3dd7fa7",
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
    name: 'Facebook',
    url: 'https://www.facebook.com/',
  }
];

@Component({
  selector: 'app-links-table',
  templateUrl: './links-table.component.html',
  styleUrls: ['./links-table.component.scss'],
})
export class LinksTableComponent {
  @Input() selectedValue: number = 0;
  dataSource = new MatTableDataSource<LinkExt>(LinkData);

  rows: any[] = [];
  displayedColumns: string[] = ['name', 'url', 'blockperiod', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.selectedValue = changes['selectedValue'].currentValue;
    }
    this.getLinks();
  }

  constructor(public dialog: MatDialog) {}

  getLinks() {
    console.log('Service in the future');
  }

  editItem(item: LinkExt) {
    console.log('Editing', item);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...item,
    };
    const dialogRef = this.dialog.open(EditBlockperiodComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed: ', result);
    });
  }

  deleteItem(link_id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      is_app: false,
      link_id,
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed: ', result);
    });
  }
}
