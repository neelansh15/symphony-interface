
interface AddBlockModalProps {
    onAddBlock?: (blockId: string) => void;
    onDismiss?: () => void;
}

export const AddBlockModal = ({onAddBlock, onDismiss}: AddBlockModalProps) => {
  return (
    <div>
      <h1>Add Block</h1>
    </div>
  );
};
