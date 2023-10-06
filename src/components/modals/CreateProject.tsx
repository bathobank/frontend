import {TProjectForm} from "@/@types/project";
import {Box} from "@/components/ui/Box";
import {Input} from "@/components/ui/Input";
import {Modal} from "@/components/ui/Modal";
import {Flex} from "@/components/ui/Flex";
import {Button} from "@/components/ui/Button";
import {Text} from "@/components/ui/Text";
import {Textarea} from "@/components/ui/Textarea";
import {PROJECT_GET_ALL_QK} from "@/queries/project/all";
import {useProjectCreateQuery} from "@/queries/project/create";
import {defaultOptionReactQueryResponse} from "@/utils/helper";
import {useForm} from "react-hook-form";
import {useQueryClient} from "react-query";

type Props = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
};

export const CreateProjectModal = ({
  isOpen,
  onClose,
  title = 'Create Project',
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<TProjectForm>({
    defaultValues: {
      title: '',
      description: '',
      user_uuid: '3115bfd9-4347-4417-ab72-da7b0ab5cb85'
    }
  });
  const projectCreateQuery = useProjectCreateQuery();
  const queryClient = useQueryClient();

  const defaultOptionMutate = defaultOptionReactQueryResponse(() => {
    reset();
    queryClient.invalidateQueries({queryKey: [PROJECT_GET_ALL_QK]});
    onClose && onClose();
  })

  const onSubmit = (form: TProjectForm) => {
    projectCreateQuery.mutate(form, defaultOptionMutate);
  }

  return (
    <Modal
      id='create-project-modal'
      isOpen={isOpen}
      title={title}
      onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6">
          <Box className='mb-3'>
            <Input
              id="project_title"
              label="Title"
              {...register("title", {required: true})}
            />
            {errors.title && <Text size='sm' col='red' className='italic mt-1'>Title is required</Text>}
          </Box>
          <Box>
            <Textarea
              id="project_description"
              label="Description"
              {...register("description", {required: true})}
            />
            {errors.description && <Text size='sm' col='red' className='italic mt-1'>Description is required</Text>}
          </Box>
        </div>
        <Flex items="center" justify="center"
          className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600 gap-[10px]">
          <Button type="submit">
            Create
          </Button>
          <Button variant='light' onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
