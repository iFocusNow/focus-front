import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditBlockperiodComponent } from '../edit-blockperiod/edit-blockperiod.component';

export interface LinkExt {
  id: number;
  name: string;
  url: string;
  device_id: number;
  blockperiod_id: number;
  blockperiod: {
    id: number;
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
    id: 1,
    device_id: 1,
    blockperiod_id: 1,
    blockperiod: {
      id: 1,
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
    id: 2,
    device_id: 2,
    blockperiod_id: 2,
    blockperiod: {
      id: 2,
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
    id: 3,
    device_id: 1,
    blockperiod_id: 1,
    blockperiod: {
      id: 1,
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
  },
  {
    id: 4,
    device_id: 2,
    blockperiod_id: 2,
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
    name: 'Instagram',
    url: 'https://www.instagram.com/',
  },
  {
    id: 5,
    device_id: 1,
    blockperiod_id: 2,
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
  },
  {
    id: 6,
    device_id: 1,
    blockperiod_id: 1,
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
    name: 'YouTube',
    url: 'https://www.youtube.com/',
  },
  {
    id: 7,
    device_id: 1,
    blockperiod_id: 1,
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
    name: 'Amazon',
    url: 'https://www.amazon.com/',
  },
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

  deleteItem(link_id: number) {
    console.log('Deleting with link_id ', link_id);
  }
}
