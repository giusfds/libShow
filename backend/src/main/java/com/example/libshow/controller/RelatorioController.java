package com.example.libshow.controller;

import com.example.libshow.domain.Emprestimo;
import com.example.libshow.domain.Reserva;
import com.example.libshow.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/emprestimos-ativos")
    public List<Emprestimo> getEmprestimosAtivos() {
        return relatorioService.getEmprestimosAtivos();
    }

    @GetMapping("/reservas-ativas")
    public List<Reserva> getReservasAtivas() {
        return relatorioService.getReservasAtivas();
    }
}

