import mongoose, {Schema} from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from "../utils/constants.js"

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        taskStatus: {
            type: String,
            enum: AvailableTaskStatuses,
            default: TaskStatusEnum.TODO
        },
        attachments:{
            type: [
                {
                    filename: String,
                    url: String,
                    mimeType: String,
                    size: Number
                }
            ],
            default: []
        }
    },
    {timestamps: true}
);

export const Task = mongoose.model("Task", taskSchema);