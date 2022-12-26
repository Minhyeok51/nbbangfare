package com.team1.nbbanfare.repository;

import java.util.List;

import com.team1.nbbanfare.dto.PresentForm;

public interface PresentRepository {
	public PresentForm insertPresent(PresentForm present);
	
	public List<PresentForm> selectByPresent(PresentForm userNo);
}
