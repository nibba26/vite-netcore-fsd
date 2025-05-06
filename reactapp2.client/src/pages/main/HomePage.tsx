import { useEffect, useState } from 'react';
import { getMembers } from '@/shared/api/authApi';
import { Member } from '@/shared/api/types';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';


const SortableItem = ({ member }: { member: Member }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition duration-300 cursor-move"
    >
      <div className="text-lg font-bold text-gray-800 mb-2">{member.name}</div>
      <div className="text-sm text-gray-500 mb-1">ID: {member.id}</div>
      <div className="text-sm text-gray-600">Email: {member.email}</div>
    </div>
  );
};







const HomePage = () => {
  const [error, setError] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch(() => {
        setError('데이터가 없습니다.');
      });
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = members.findIndex((m) => m.id === active.id);
      const newIndex = members.findIndex((m) => m.id === over?.id);

      setMembers((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">User List</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={members.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <SortableItem key={member.id} member={member} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
