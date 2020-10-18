import { Injectable} from '@angular/core';

@Injectable()
export class UserService {
   currentID: number;
   getCurrentID(){
      return this.currentID;
   }
   setCurrentID(userID: number){
       this.currentID = userID;
   }
}
