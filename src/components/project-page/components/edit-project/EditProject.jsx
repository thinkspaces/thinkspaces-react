import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import EditProjectImages from '../../../submit-project/components/edit-project-images'
import ProjectImagesForm from '../project-form/project-images-form'

const EditProject = ({ saveChanges, project, pid, onEditChange, onCancel }) => (
  <div>
    <Form>
      <FormGroup>
        <Label for="title">Project Name</Label>
        <Input
          id="title"
          value={project.title}
          onChange={onEditChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="contact">Contact Email</Label>
        <Input
          id="contact"
          value={project.contact}
          onChange={onEditChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="card_des">
                        Tell us a bit about your project (in one sentence)
        </Label>
        <Input
          id="card_des"
          value={project.card_des}
          onChange={onEditChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="about">
                        Now tell us a bit more about your project
        </Label>
        <Input
          type="textarea"
          id="about"
          value={project.about}
          onChange={onEditChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="need">
                        Most importantly, what type of people are you
                        looking for?
        </Label>
        <Input
          type="textarea"
          id="need"
          value={project.need}
          onChange={onEditChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="links">
          {' '}
                        Link to your website or social media
        </Label>
        <Input
          value={project.links}
          id="links"
          onChange={onEditChange}
          placeholder="http://www.yourwebsite.com"
        />
      </FormGroup>
      {/* <EditProjectImages pid={pid} />
                 */}
      <ProjectImagesForm pid={pid} />
    </Form>
    <br />
    <Button
      color="info"
      onClick={saveChanges}
      style={{ marginRight: 5 }}
    >
                Save
    </Button>
    <Button color="danger" onClick={onCancel}>
                Cancel
    </Button>
  </div>
);

export default EditProject;
