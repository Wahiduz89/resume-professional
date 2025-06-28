import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Project } from '@/types'

interface ProjectsStepProps {
  data: { projects: Project[] }
  onChange: (data: { projects: Project[] }) => void
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      name: '',
      description: '',
      technologies: []
    }
    onChange({ projects: [...(data.projects || []), newProject] })
  }

  const updateProject = (index: number, updates: Partial<Project>) => {
    const updatedProjects = [...(data.projects || [])]
    updatedProjects[index] = { ...updatedProjects[index], ...updates }
    onChange({ projects: updatedProjects })
  }

  const deleteProject = (index: number) => {
    onChange({ 
      projects: (data.projects || []).filter((_, i) => i !== index) 
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Academic Projects</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your college projects, hackathon submissions, or personal projects
          </p>
        </div>
        <Button onClick={addProject} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Project
        </Button>
      </div>

      {(!data.projects || data.projects.length === 0) ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            Projects help showcase your practical skills to recruiters
          </p>
          <Button onClick={addProject}>Add Your First Project</Button>
        </div>
      ) : (
        data.projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <Input
              placeholder="Project Title (e.g., E-commerce Website, ML Model)"
              value={project.name}
              onChange={(e) => updateProject(index, { name: e.target.value })}
            />
            
            <textarea
              placeholder="Describe the project, your role, and key achievements..."
              value={project.description}
              onChange={(e) => updateProject(index, { description: e.target.value })}
              className="w-full p-3 border rounded-lg resize-none h-20"
            />
            
            <Input
              placeholder="Technologies used (comma-separated, e.g., React, Node.js, MongoDB)"
              value={project.technologies?.join(', ') || ''}
              onChange={(e) => updateProject(index, { 
                technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
              })}
            />
            
            <div className="flex justify-between">
              <Input
                placeholder="Project Link (GitHub/Demo URL)"
                value={project.link || ''}
                onChange={(e) => updateProject(index, { link: e.target.value })}
                className="flex-1 mr-2"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}