import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LinkService } from 'src/app/services/link.service';
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
  private routerSubscription: Subscription | undefined;
  isValueAdded: boolean = false;

  displayedColumns: string[] = ['name', 'url', 'blockperiod', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // clean AppDeviceData
        this.dataSource = new MatTableDataSource<LinkBlockPeriodDto>(LinkData);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let device_id = '';
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      device_id = changes['selectedValue'].currentValue;
      this.getLinks(device_id);
    }
  }

  constructor(
    public dialog: MatDialog,
    private linkService: LinkService,
    private router: Router
  ) {}

  getLinks(device_id: string) {
    this.linkService.getLinks(device_id).subscribe((response: any) => {
      if (response) {
        this.dataSource = new MatTableDataSource<LinkBlockPeriodDto>(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

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
      if (result) {
        window.location.reload();
      }
    });
  }
}
