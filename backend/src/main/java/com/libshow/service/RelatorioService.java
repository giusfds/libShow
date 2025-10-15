package com.libshow.service;

import com.libshow.domain.Emprestimo;
import com.libshow.domain.Reserva;
import com.libshow.repository.EmprestimoRepository;
import com.libshow.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;
    @Autowired
    private ReservaRepository reservaRepository;

    public List<Emprestimo> getEmprestimosAtivos() {
        // Implement logic to get active loans
        return emprestimoRepository.findAll().stream()
                .filter(e -> e.getDataDevolucaoReal() == null)
                .collect(Collectors.toList());
    }

    public List<Reserva> getReservasAtivas() {
        // Implement logic to get active reservations
        return reservaRepository.findAll().stream()
                .filter(r -> "ATIVA".equals(r.getStatus()))
                .collect(Collectors.toList());
    }

    // Add more reporting methods as needed
}

