import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueInListValidator } from 'src/app/utils/customValidator';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-crear',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  taskForm!: FormGroup;
  hasbeenSubmitted:boolean =false;

  constructor(private tasksService:TasksService,private router:Router){    
  }

  get peopleForm(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  getSkillForm(position:number): FormArray{
    return this.peopleForm.at(position).get('skills') as FormArray;
  }


  ngOnInit(): void {
    
    this.taskForm = new FormGroup({
      id: new FormControl(Math.random() * (1000 - 1) + 1),
      title: new FormControl('', [Validators.required]),
      limitDate: new FormControl ('', [Validators.required]),
      people:new FormArray([
        this.generatePersonFormControl(),
      ],[ uniqueInListValidator('name')])
    })
  }

  generatePersonFormControl(){
    const personFormControl = new FormGroup({
      name: new FormControl('', [ Validators.required,Validators.minLength(5)]),
      age: new FormControl('', [Validators.required,Validators.pattern('^[0-9,$]*$'),Validators.min(18)]),
      skills: new FormArray([
        this.generateSkillFormControl()
      ],Validators.required)
    })

    return personFormControl;
  }

  generateSkillFormControl(){
    return new FormGroup({ name: new FormControl('', [Validators.required]) })
  }

    
  addPerson(){
    const peopleFormGroup = this.peopleForm;
    peopleFormGroup.push( 
      this.generatePersonFormControl()
    );
  }

  addSkill(position:number){
    const personSkills =this.getSkillForm(position);
    personSkills.push(
      this.generateSkillFormControl()
    )
  }

  deleteSkill(positionPerson:number,positionSkill:number){
    const personSkills =this.getSkillForm(positionPerson);
    personSkills.removeAt(positionSkill);
  }

  deletePerson(position:number){
    this.peopleForm.removeAt(position);
  }


  saveTask(){
    this.hasbeenSubmitted=true;
    const limitDate = new Date(this.taskForm.value.limitDate)
    this.tasksService.addTask({...this.taskForm.value,completed:false,limitDate});
    this.router.navigate(['/tasks'])
  }

}
