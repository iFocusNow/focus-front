import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditBlockperiodComponent } from '../edit-blockperiod/edit-blockperiod.component';

export interface LinkBlockPeriodDto {
  id: string;
  name: string;
  url: string;
  blockperiod_id: string;
  is_monday: boolean;
  is_tuesday: boolean;
  is_wednesday: boolean;
  is_thursday: boolean;
  is_friday: boolean;
  is_saturday: boolean;
  is_sunday: boolean;
}

const LinkData: LinkBlockPeriodDto[] = [];

@Component({
  selector: 'app-links-table',
  templateUrl: './links-table.component.html',
  styleUrls: ['./links-table.component.scss'],
})
export class LinksTableComponent {
  @Input() selectedValue: number = 0;
  dataSource = new MatTableDataSource<LinkBlockPeriodDto>(LinkData);

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

  constructor(public dialog: MatDialog, private linkService: LinkService) {}

  getLinks() {}

  editItem(item: LinkBlockPeriodDto) {
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
