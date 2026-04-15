"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import { updateCategory } from "@/actions/admin.action";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
});

export default function CategoryTable({ data }: { data: any[] }) {
  const [selected, setSelected] = useState<{ id: string } | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating category...");

      const payload = {
        name: value.name,
        description: value.description,
      }
      try {
        if(!selected) {
          toast.error("No category selected.", { id: toastId });
          return;
        }
        const {data, error} = await updateCategory(selected.id, payload)
        if(data) {
            router.refresh()
            toast.success("Category updated successfully!", { id: toastId });
            setOpenUpdate(false);
        }
      } catch (error) {
        toast.error("Failed to update category.", { id: toastId });
      } finally {
        toast.dismiss(toastId);
      }
    },
    validators: {
      onSubmit: schema,
    },
  });

  const handleUpdateClick = (item: any) => {
    setSelected(item);
    form.setFieldValue("name", item.name);
    form.setFieldValue("description", item.description);
    setOpenUpdate(true);
  };

  return (
    <div className="p-6 border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Modal */}
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div>
                    <Input
                      placeholder="Title"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div>
                    <Input
                      placeholder="Description"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                );
              }}
            />

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
