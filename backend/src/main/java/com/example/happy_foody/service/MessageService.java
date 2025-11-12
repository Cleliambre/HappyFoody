package com.example.happy_foody.service;

import com.example.happy_foody.model.Message;
import com.example.happy_foody.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message getMessageById(Long id) throws ResourceNotFoundException {
        Message message = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        return message;
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(Long messageId, Message messageDetails) throws ResourceNotFoundException {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        message.setContenu(messageDetails.getContenu());
        message.setMessageLu(messageDetails.getMessageLu());
        message.setEmetteur(messageDetails.getEmetteur());
        message.setRecepteur(messageDetails.getRecepteur());
        message.setDateEnvoi(messageDetails.getDateEnvoi());

        final Message updatedMessage = messageRepository.save(message);
        return updatedMessage;
    }

    public void deleteMessage(Long messageId) throws ResourceNotFoundException {
        Message message = messageRepository.findById(messageId).orElseThrow(()->new ResourceNotFoundException("Message not found"));

        messageRepository.delete(message);
    }
}
