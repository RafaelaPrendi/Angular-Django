import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {Group} from "../models/Group";
import {GroupService} from "../services/group.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  submitted = false;
  isUpdated = false;
  new_user!: User;
  current_user!: User;
  current_user_id!: number;
  groups!: Group[];

  constructor(private userService: UserService,
              private groupService: GroupService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.getGroups();
    this.createForm();
    this.checkIfUpdate();
  }

  getGroups() {
    this.groupService.getGroups().subscribe(response => {
      this.groups = response;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      groups: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
    });
  }

  rebuildForm() {
    this.formGroup.reset({
      username: '',
      first_name: '',
      last_name: '',
      groups: [],
      email: '',
      password: '',
      confirm_password: ''
    })
  }

  checkIfUpdate() {
    this.current_user_id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.current_user_id) {
      this.isUpdated = true;
      this.userService.getSingleUser(this.current_user_id).subscribe(response => {
          this.current_user = response;
          this.formGroup.patchValue(response);
          console.log('FROM CHECKIFUPDATE', response);
        },
        error => {
          console.log(error);
        });
    }
  }

  createUser(): User {
    const formModel = this.formGroup.value;
    const saveUser: User = {
      username: formModel.username,
      first_name: formModel.first_name,
      last_name: formModel.last_name,
      groups: formModel.groups,
      email: formModel.email,
      password: formModel.password,
    } as User;
    return saveUser;
  }

  onSubmit() {
    //update
    if (this.isUpdated) {
      this.current_user = this.formGroup.value;
      this.userService.update(Number(this.current_user_id), this.current_user).subscribe(response => {
          console.log(response);
          this.router.navigate(['/users']);
        }
        , error => console.log(error));
      this.submitted = true;
      this.rebuildForm();
      this.router.navigate(['/users']);
    } else {
      this.new_user = this.createUser();
      let pass = this.formGroup.controls.password.value
      let conf_pass = this.formGroup.controls.confirm_password.value
      if (pass == conf_pass) {
        this.userService.create(this.new_user).subscribe(response => {
            console.log('CREATE: ', response);
          },
          error => {
            console.log(error);
          });
        this.submitted = true;
        this.rebuildForm();
        this.router.navigate(['/users']);
      } else {
        console.log("Password and confirmed password are not the same!");
      }
    }
  }
}
