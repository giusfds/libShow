package com.example.libshow.controller;

import com.example.libshow.domain.Emprestimo;
import com.example.libshow.domain.Reserva;
import com.example.libshow.service.RelatorioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private static final Logger logger = LoggerFactory.getLogger(RelatorioController.class);

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/emprestimos-ativos")
    public List<Emprestimo> getEmprestimosAtivos() {
        logger.info("[RelatorioController] Buscando relatório de empréstimos ativos");
        try {
            List<Emprestimo> emprestimos = relatorioService.getEmprestimosAtivos();
            logger.info("[RelatorioController] Relatório gerado: {} empréstimos ativos encontrados", emprestimos.size());
            return emprestimos;
        } catch (Exception e) {
            logger.error("[RelatorioController] Erro ao gerar relatório de empréstimos ativos", e);
            throw e;
        }
    }

    @GetMapping("/reservas-ativas")
    public List<Reserva> getReservasAtivas() {
        logger.info("[RelatorioController] Buscando relatório de reservas ativas");
        try {
            List<Reserva> reservas = relatorioService.getReservasAtivas();
            logger.info("[RelatorioController] Relatório gerado: {} reservas ativas encontradas", reservas.size());
            return reservas;
        } catch (Exception e) {
            logger.error("[RelatorioController] Erro ao gerar relatório de reservas ativas", e);
            throw e;
        }
    }
}
