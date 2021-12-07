import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../components/members/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component:MemberEditComponent){
        if(component.editForm.dirty){
            return confirm('آیا مطمئن هستید که میخواهید به صفحه دیگر بروید؟ تغییرات ذخیره نشده اند!');
        }
        return true;
    }

}


