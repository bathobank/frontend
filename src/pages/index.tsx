import {TProjects, TProjectUpdateForm} from "@/@types/project";
import {UpdateProjectModal} from "@/components/modals/UpdateProject";
import {Box} from "@/components/ui/Box";
import {ProjectItem} from "@/components/pages/home/ProjectItem";
import {GlobalLayout} from "@/components/layouts/GlobalLayout";
import {Button} from "@/components/ui/Button";
import {CreateProjectModal} from "@/components/modals/CreateProject";
import {Text} from "@/components/ui/Text";
import {useProjectAllQuery} from "@/queries/project/all";
import {useEffect, useState} from "react";

export default function Home() {
  const [isOpenModalCreateProject, setOpenModalCreateProject] = useState<boolean>(false);
  const [isOpenModalUpdateProject, setOpenModalUpdateProject] = useState<boolean>(false);
  const [formDataUpdateProject, setFormDataUpdateProject] = useState<TProjectUpdateForm>({title: '', description: ''});
  const [uuidProjectEdit, setUuidProjectEdit] = useState<string>('');
  const [projects, setProjects] = useState<TProjects>([]);
  const allProject = useProjectAllQuery();

  useEffect(() => {
    if (allProject) {
      setProjects(allProject.data.projects);
    }
  }, [allProject]);

  const onEdit = (uuid: string, data: TProjectUpdateForm) => {
    setFormDataUpdateProject(data);
    setUuidProjectEdit(uuid);
    setOpenModalUpdateProject(true);
  }

  return (
    <GlobalLayout
      bgSrc='https://trello-backgrounds.s3.amazonaws.com/5acc9426bfa043c72b56488a/1920x1920/7b5d121c88219628ecb1f0ec46283017/shutterstock_134707556.jpeg.jpg'
      titleRightEl={<Button onClick={() => setOpenModalCreateProject(true)}>Create Project</Button>}
      title="Your Projects">
      <Box>
        {projects.map((project, index) => (
          <ProjectItem
            key={`board-${index}`}
            project={project}
            onEdit={onEdit}
          />
        ))}
        {projects.length === 0 && (
          <Text align="center" className='bg-white py-[15px] rounded-xl'>No projects!</Text>
        )}
      </Box>
      <CreateProjectModal isOpen={isOpenModalCreateProject} onClose={() => setOpenModalCreateProject(false)} />
      <UpdateProjectModal
        isOpen={isOpenModalUpdateProject}
        onClose={() => setOpenModalUpdateProject(false)}
        formData={formDataUpdateProject}
        uuid={uuidProjectEdit}
      />
    </GlobalLayout>
  )
}
