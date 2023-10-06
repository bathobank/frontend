import {TProjectUpdateForm} from "@/@types/project";
import {Box} from "@/components/ui/Box";
import {Input} from "@/components/ui/Input";
import {Modal} from "@/components/ui/Modal";
import {Flex} from "@/components/ui/Flex";
import {Button} from "@/components/ui/Button";
import {Text} from "@/components/ui/Text";
import {Textarea} from "@/components/ui/Textarea";
import {PROJECT_GET_ALL_QK} from "@/queries/project/all";
import {useProjectUpdateQuery} from "@/queries/project/update";
import {defaultOptionReactQueryResponse} from "@/utils/helper";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useQueryClient} from "react-query";

type Props = {
  isOpen: boolean;
  formData: TProjectUpdateForm;
  uuid: string;
  title?: string;
  onClose?: () => void;
};

export const UpdateProjectModal = ({
  isOpen,
  onClose,
  formData,
  uuid,
  title = 'Update Project',
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors}
  } = useForm<TProjectUpdateForm>({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const projectUpdateQuery = useProjectUpdateQuery(uuid);
  const queryClient = useQueryClient();

  const defaultOptionMutate = defaultOptionReactQueryResponse(() => {
    reset();
    queryClient.invalidateQueries({queryKey: [PROJECT_GET_ALL_QK]});
    onClose && onClose();
  });

  useEffect(() => {
    setValue('title', formData.title);
    setValue('description', formData.description);
  }, [formData, setValue]);

  const onSubmit = (form: TProjectUpdateForm) => {
    projectUpdateQuery.mutate(form, defaultOptionMutate);
  }

  return (
    <Modal
      id='update-project-modal'
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
            Update
          </Button>
          <Button variant='light' onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
