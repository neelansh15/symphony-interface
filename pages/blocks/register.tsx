import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useRef, useState } from "react";
import { BlockSchema, InputSchema, OutputSchema } from "@/types/apiTypes";
import { createBlock } from "@/utils/api/block";
import { toast } from "sonner";
import autoAnimate from "@formkit/auto-animate";
import clsx from "clsx";

export default function RegisterBlocksPage() {
  const parent0 = useRef(null);
  const parent1 = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubUrl: "",
    params: {
      inputSchema: [] as InputSchema[],
      outputSchema: [] as OutputSchema[],
    },
    startupCommand: "",
    buildCommand: "",
  });

  const handleChange = (key: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSchemaChange =
    (type: "input" | "output", index: number, field: keyof InputSchema) =>
    (value: string) => {
      setFormData((prev) => ({
        ...prev,
        params: {
          ...prev.params,
          [`${type}Schema`]: prev.params[`${type}Schema`].map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
          ),
        },
      }));
    };

  const addSchemaItem = (type: "input" | "output") => {
    setFormData((prev) => ({
      ...prev,
      params: {
        ...prev.params,
        [`${type}Schema`]: [
          ...prev.params[`${type}Schema`],
          { name: "", type: "string" },
        ],
      },
    }));
  };

  const removeSchemaItem = (type: "input" | "output", index: number) => {
    setFormData((prev) => ({
      ...prev,
      params: {
        ...prev.params,
        [`${type}Schema`]: prev.params[`${type}Schema`].filter(
          (_, i) => i !== index,
        ),
      },
    }));
  };

  const handleRegisterBlock = async () => {
    try {
      const blockData: BlockSchema = {
        created_by: "0x123",
        name: formData.name,
        description: formData.description,
        location: formData.githubUrl,
        vcs_path: formData.githubUrl,
        startup_command: formData.startupCommand || "npm run dev",
        build_command: formData.buildCommand || "npm run build",
        params: {
          input: formData.params.inputSchema,
          output: formData.params.outputSchema,
        },
      };

      toast.info(`Registering block...`);

      await createBlock(blockData);

      toast.success(`Block registered successfully!`);
    } catch (error) {
      console.error("Error registering block:", error);
      toast.error("Error registering block");
    }
  };

  useEffect(() => {
    parent0.current && autoAnimate(parent0.current);
  }, [parent0]);

  useEffect(() => {
    parent1.current && autoAnimate(parent1.current);
  }, [parent1]);

  return (
    <DefaultLayout>
      <main className="md:grid place-items-center">
        <div className="md:w-full md:max-w-[600px]">
          <h1
            className={clsx(
              title(),
              "font-akira underline decoration-secondary-500",
            )}
          >
            Register Blocks
          </h1>
          <p className="mt-3">
            Blocks are the foundation of a Symphony Workflow. Read the developer
            docs to find how you can create your own custom block.
          </p>

          <section className="mt-10 flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full max-w-2xl">
            <Input
              label="Name"
              placeholder="Enter block name"
              value={formData.name}
              onValueChange={handleChange("name")}
            />

            <Input
              label="Description"
              placeholder="Enter block description"
              value={formData.description}
              onValueChange={handleChange("description")}
            />

            <Input
              label="GitHub URL"
              placeholder="https://github.com/username/repository"
              value={formData.githubUrl}
              onValueChange={handleChange("githubUrl")}
              className="col-span-2"
              description="Please make sure the repository is public"
            />

            <Input
              label="Startup Command"
              placeholder="npm run dev"
              value={formData.startupCommand}
              onValueChange={handleChange("startupCommand")}
              description="Optional"
            />

            <Input
              label="Build Command"
              placeholder="npm run build"
              value={formData.buildCommand}
              onValueChange={handleChange("buildCommand")}
              description="Optional"
            />
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Input Format</h2>
            <div ref={parent0}>
              {formData.params.inputSchema.map((input, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <Input
                    label="Name"
                    placeholder="Parameter name"
                    value={input.name}
                    onValueChange={handleSchemaChange("input", index, "name")}
                  />
                  <Select
                    label="Type"
                    placeholder="Select type"
                    value={input.type}
                    onChange={(e) =>
                      handleSchemaChange("input", index, "type")(e.target.value)
                    }
                  >
                    <SelectItem key="string" value="string">
                      String
                    </SelectItem>
                    <SelectItem key="number" value="number">
                      Number
                    </SelectItem>
                  </Select>
                  <Input
                    label="Label"
                    placeholder="Display label"
                    value={input.label}
                    onValueChange={handleSchemaChange("input", index, "label")}
                  />
                  <Button
                    color="danger"
                    onClick={() => removeSchemaItem("input", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={() => addSchemaItem("input")}>
              Add Input Parameter
            </Button>

            <h2 className="text-xl font-bold mb-4 mt-8">Output Format</h2>
            <div ref={parent1}>
              {formData.params.outputSchema.map((output, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <Input
                    label="Name"
                    placeholder="Parameter name"
                    value={output.name}
                    onValueChange={handleSchemaChange("output", index, "name")}
                  />
                  <Select
                    label="Type"
                    placeholder="Select type"
                    value={output.type}
                    onChange={(e) =>
                      handleSchemaChange(
                        "output",
                        index,
                        "type",
                      )(e.target.value)
                    }
                  >
                    <SelectItem key="string" value="string">
                      String
                    </SelectItem>
                    <SelectItem key="number" value="number">
                      Number
                    </SelectItem>
                  </Select>
                  <Button
                    color="danger"
                    onClick={() => removeSchemaItem("output", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={() => addSchemaItem("output")}>
              Add Output Parameter
            </Button>
          </section>

          <Button
            onClick={() => handleRegisterBlock()}
            className="mt-10"
            color="primary"
          >
            Register
          </Button>
        </div>
      </main>
    </DefaultLayout>
  );
}
