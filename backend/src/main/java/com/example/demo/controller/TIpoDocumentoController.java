package com.example.demo.controller;

import com.example.demo.entity.TipoDocumento;
import com.example.demo.repository.TipoDocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("documento")
public class TIpoDocumentoController {

    @Autowired
    TipoDocumentoRepository tipoDocumentoRepository;

    /*---------------------------REST SERVICES---------------------------*/

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getContribuyenteList(){
        return new ResponseEntity(tipoDocumentoRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getContribuyente(@PathVariable("id") String idString){
        HashMap<String, Object> response = new HashMap<>();

        try{
            int id = Integer.parseInt(idString);
            Optional<TipoDocumento> opt = tipoDocumentoRepository.findById(id);
            if (opt.isPresent()){
                response.put("estado","ok");
                response.put("tipo de documento", opt.get());
                return new ResponseEntity(response, HttpStatus.OK);
            } else {
                response.put("estado","error");
                response.put("msg","no se encontró tipo de documento con este id");
                return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
            }
        } catch (NumberFormatException ex) {
            response.put("estado","error");
            response.put("msg","El ID debe ser un número");
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity postContribuyente(@RequestBody TipoDocumento tipoDocumento,
                                            @RequestParam(value = "devolverID", required = false) boolean devolverID){
        HashMap<String,Object> response = new HashMap<>();
        tipoDocumentoRepository.save(tipoDocumento);
        if (devolverID) {
            response.put("id generado",tipoDocumento.getId());
        }
        response.put("estado","creado");
        return new ResponseEntity(response,HttpStatus.CREATED);
    }

    //NO SE EVALUARA EL CASO EN QUE SOLO SE ENVIEN ALGUNOS PARAMETROS
    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity putContribuyente(@RequestBody TipoDocumento tipoDocumento){
        HashMap<String,Object> response = new HashMap<>();

        if (tipoDocumento.getId()>0) {
            Optional<TipoDocumento> opt = tipoDocumentoRepository.findById(tipoDocumento.getId());
            if (opt.isPresent()) {
                tipoDocumentoRepository.save(tipoDocumento);
                response.put("estado","actualizado");
                return new ResponseEntity(response,HttpStatus.OK);
            } else {
                response.put("estado","error");
                response.put("msg","No existe el tipo de documento con el id enviado");
                return new ResponseEntity(response,HttpStatus.BAD_REQUEST);
            }
        } else {
            response.put("estado","error");
            response.put("msg","El id enviado debe ser mayor a 0");
            return new ResponseEntity(response,HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteContribuyente(@PathVariable("id") String idStr){
        HashMap<String,Object> response = new HashMap<>();

        try {
            int id = Integer.parseInt(idStr);
            if (tipoDocumentoRepository.existsById(id)) {
                tipoDocumentoRepository.deleteById(id);
                response.put("estado","borrado exitoso");
                return new ResponseEntity(response,HttpStatus.OK);
            } else {
                response.put("estado","error");
                response.put("msg","No se encontró el tipo de documento con id: "+id);
                return new ResponseEntity(response,HttpStatus.BAD_REQUEST);
            }
        } catch (NumberFormatException ex){
            response.put("estado","error");
            response.put("msg","Poner un número en el campo ID");
            return new ResponseEntity(response,HttpStatus.BAD_REQUEST);
        }
    }

    /*---------------------------REST SERVICES---------------------------*/



    //SE MANEJA LA EXCEPCION POR NO ENVIAR UN TIPO DE CONTRIBUYENTE EN LOS METODOS POST Y PUT
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity dealException(HttpServletRequest req){
        HashMap<String,Object> response = new HashMap<>();
        if (req.getMethod().equals("POST") || req.getMethod().equals("PUT")) {
            response.put("estado","error");
            response.put("msg","Se debe enviar un documento válido");
        }
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }
}
