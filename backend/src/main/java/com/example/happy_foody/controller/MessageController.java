package com.example.happy_foody.controller;

import com.example.happy_foody.model.Message;
import com.example.happy_foody.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/message")
@CrossOrigin
public class MessageController {
    private final MessageService messageService;


    @Autowired
    public MessageController(MessageService messageService) {this.messageService = messageService;}

    //SELECT
    @GetMapping("/all")
    public List<Message> getMessages(){
        return messageService.getAllMessages();
    }

    //SELECT
    @GetMapping("/getMessageById/{id}")
    public Message getMessageById(@PathVariable(value = "id") Long id){
        return messageService.getMessageById(id);
    }

    //INSERT
    @PostMapping("/createMessage")
    public Message createMessage(@RequestBody Message Message){return messageService.createMessage(Message);}

    //UPDATE
    @PutMapping("/updateMessage/{id}")
    public Message updateMessage(@PathVariable(value = "id") Long id, @RequestBody Message Message){
        return messageService.updateMessage(id, Message);
    }

    //DELETE
    @DeleteMapping("/deleteMessage/{id}")
    public void deleteMessage(@PathVariable(value = "id") Long id){
        messageService.deleteMessage(id);
    }
}
