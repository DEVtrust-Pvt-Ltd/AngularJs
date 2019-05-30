import { Component, OnInit } from '@angular/core';
import { GridDataService } from 'src/app/Services/gridData.service';
import { PageService } from 'src/app/Services/page.service';
import { HomeScreenService } from 'src/app/Services/home-screen.service';

@Component({
    selector: 'app-add-tab-bg-images',
    templateUrl: './add-tab-bg-images.component.html',
    styleUrls: ['./add-tab-bg-images.component.scss']
})
export class AddTabBgImagesComponent implements OnInit {
    public bgImageDialogDisplay: boolean = false;
    public bgImageHeader: string;
    public backgroundImg: File = null;
    public photosIconsPager: any = {
        total: 0,
        currentPage: 1,
        itemsPerPage: 24
    };

    constructor(
        private dataService: GridDataService,
        private pageService: PageService,
        private homeScreenService: HomeScreenService,
    ) {
    }

    ngOnInit() {
        this.getBackgroundImages();
    }

    public showAddBgImageDialog(): void {
        this.bgImageHeader = "Add New Tab Background Image";
        this.bgImageDialogDisplay = true;
        this.pageService.onDialogOpen();
    }

    public photosIconsPageChanged(event: any): void {
        this.photosIconsPager.currentPage = event.page;
        this.getBackgroundImages();
    }

    public onBackgroundImageChange(event): void {
        this.backgroundImg = event.target.files[0];
        this.homeScreenService.buttonBackgroundImageTarget = event.target;
    }

    public onBackgroundImgUploadClick(): void {
        PageService.showLoader();
        this.homeScreenService.uploadButtonBackgroundImgGlobally(this.backgroundImg).subscribe(res => {
            PageService.hideLoader();
            if (res.success) {
                this.backgroundImg = null;
                this.homeScreenService.buttonBackgroundImageTarget.value = null;
                this.pageService.showSuccess("Background image saved");
                this.bgImageDialogDisplay = false;
                this.getBackgroundImages();
                this.homeScreenService.homeScreenSettings.buttons.background_img = res.createdImgId;
            } else {
                this.pageService.showError(res.message);
            }
        });
    }

    public getBackgroundImages(): void {
        this.homeScreenService.getButtonBackrgroundImagesListGlobally().subscribe(res => {
            if (res.success) {
                this.homeScreenService.buttonBackgroundImages = res.data;
                this.photosIconsPager.total = res.data.length;
                for (let val of res.data) {
                    this.homeScreenService.buttonBgImageSrcs[val.id] = val.name;
                }
            }
        });
    }

    public onDeleteBgImageClick(event, id: number): void {
        event.stopPropagation();
        if (confirm("Are you sure you want to delete this ?")) {
            PageService.showLoader();
            this.homeScreenService.deleteButtonBackrgroundImage(id).subscribe(res => {
                PageService.hideLoader();
                if (res.success) {
                    this.pageService.showSuccess(res.message);
                    this.dataService.getByID(this.homeScreenService.buttonBackgroundImages, id, (data, index) => {
                        this.homeScreenService.buttonBackgroundImages.splice(index, 1);
                        this.homeScreenService.buttonBgImageSrcs[data.id] = null;
                    });
                } else {
                    this.pageService.showSuccess(res.message);
                }
            });
        }
    }
}
