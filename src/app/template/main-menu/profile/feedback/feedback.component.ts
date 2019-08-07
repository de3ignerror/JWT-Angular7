import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MessagesService} from '../../../../core/_services/messages.service';
import {AuthenticationService} from '../../../../core/_services';
import {Message} from '../../../../core/_models/message';
import {CoreDataService} from '../../../../core/_services/core-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: 'feedback.html',
  styleUrls: ['feedback.css'],
})
export class FeedbackComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(FeedbackDialogComponent);
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: 'feedback-dialog.html',
  styleUrls: ['feedback-dialog.scss'],
})
export class FeedbackDialogComponent {
  constructor(private ms: MessagesService, public auth: AuthenticationService, private coreData: CoreDataService,
              public dialogRef: MatDialogRef<FeedbackDialogComponent>) {}

  Title:string;
  Article: string;

  sendMessage() {

  if (this.Title && this.Article) {
    this.coreData.SelectIdUser(this.auth.currentUserSubject.value).subscribe(res => {
      if (res[0]['result'] == 'success') {
        var idUser = res[0]['data'][0]['idusers'];
        this.ms.sendMessage(new Message(undefined, this.Title,
          this.Article,
          idUser, 1)).subscribe(res => {
          this.dialogRef.close();
        });
      }
    });
  } else {
  this.ms.openSnackBar('Заполните тему и тело сообщения','');
  }
  }

}
