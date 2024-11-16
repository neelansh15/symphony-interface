import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { InputSchema, OutputSchema } from "@/types/apiTypes";

export default function RegisterBlocksPage() {
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

  return (
    <DefaultLayout>
      <main className="grid place-items-center">
        <div className="min-w-[600px]">
          <h1 className={title()}>Register Blocks</h1>

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
            <h2 className="text-xl font-bold mb-4">Input Schema</h2>
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
            <Button onClick={() => addSchemaItem("input")}>
              Add Input Parameter
            </Button>

            <h2 className="text-xl font-bold mb-4 mt-8">Output Schema</h2>
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
                    handleSchemaChange("output", index, "type")(e.target.value)
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

            <Button onClick={() => addSchemaItem("output")}>
              Add Output Parameter
            </Button>
          </section>

          <Button className="mt-10" color="primary">
            Register
          </Button>
        </div>
      </main>
    </DefaultLayout>
  );
}
