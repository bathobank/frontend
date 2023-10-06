import {TProject, TProjectUpdateForm} from "@/@types/project";
import {Flex} from "@/components/ui/Flex";
import {Box} from "@/components/ui/Box";
import {LinkUI} from "@/components/ui/Link";
import {PROJECT_GET_ALL_QK} from "@/queries/project/all";
import {useProjectDeleteQuery} from "@/queries/project/delete";
import {defaultOptionReactQueryResponse} from "@/utils/helper";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Text} from "@/components/ui/Text";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useQueryClient} from "react-query";

const bgSrc = '/images/sky1.jpg';

type Props = {
  project: TProject;
  onEdit?: (uuid: string, data: TProjectUpdateForm) => void;
}

export const ProjectItem = ({project, onEdit}: Props) => {
  const useProjectDelete = useProjectDeleteQuery();
  const queryClient = useQueryClient();

  const defaultOption = defaultOptionReactQueryResponse(() => {
    queryClient.invalidateQueries({queryKey: [PROJECT_GET_ALL_QK]})
  });

  const editProject = (project: TProject) => {
    onEdit && onEdit(project.uuid, {
      title: project.title,
      description: project.description
    });
  }

  const removeProject = (uuidProject: string) => {
    if (!confirm('Are you sure delete this project?')) return;
    useProjectDelete.mutate(uuidProject, defaultOption)
  }

  return (
    <Flex justify="between" className="bg-white rounded-xl p-[10px] mb-2">
      <Flex className="w-[calc(100%-80px)]">
        <Box className='w-[80px] h-[80px] bg-cover bg-no-repeat bg-center rounded-xl' style={{ backgroundImage: `url('${bgSrc}')`}} />
        <Box className='w-[calc(100%-80px)] pl-[15px]'>
          <Text weight="semibold">{project.title}</Text>
          <Text>{project.description}</Text>
          <Flex>
            <Flex
              onClick={() => editProject(project)}
              className='mr-3 font-medium text-sm text-primary-600 dark:text-primary-500 hover:underline cursor-pointer'>
              <CreateOutlinedIcon className='!w-[.75em] !h-[.75em] mr-1' />
              <span className='relative top-[2px]'>Edit</span>
            </Flex>
            <Flex
              onClick={() => removeProject(project.uuid)}
              className='font-medium text-sm text-primary-600 dark:text-primary-500 hover:underline cursor-pointer'>
              <DeleteForeverOutlinedIcon className='!w-[.75em] !h-[.75em] mr-1' />
              <span className='relative top-[2px]'>Remove</span>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Box className="w-[80px] text-right">
        <LinkUI href={`/board/${project.uuid}`} underline={false}>Go <NavigateNextIcon /></LinkUI>
      </Box>
    </Flex>
  );
}
