'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import qs from 'query-string';
import axios from 'axios';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteChannel';
  const { channel, server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: { serverId: server?.id },
      });

      await axios.delete(url);
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Channel
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-indigo-500'>
              {' '}
              #{channel?.name}{' '}
            </span>{' '}
            will be permanently deleted ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button variant='ghost' disabled={isLoading} onClick={onClose}>
              Cancle
            </Button>
            <Button variant='primary' disabled={isLoading} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
