import { BlockCard } from "@/components/blocks/BlockCard";
import DefaultLayout from "@/layouts/default";
import "./styles.css"

export default function CreatePage() {
  return (
    <DefaultLayout>
      <section>
        <h1>Create Workflow</h1>

        <div className="workflow-background">
          <BlockCard />
        </div>
      </section>
    </DefaultLayout>
  );
}
