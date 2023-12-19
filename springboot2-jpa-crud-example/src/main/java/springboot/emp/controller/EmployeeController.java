package springboot.emp.controller;

import java.util.ArrayList;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.emp.exception.ResourceNotFoundException;
import springboot.emp.model.Employee;
import springboot.emp.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;

	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		
		List<Employee> emp= new ArrayList<>();
				

		for(Employee e:employeeRepository.findAll()) {
			if(!e.getRole().equals("admin")) {
				emp.add(e);
			}
			
		}
		return emp;
		//return employeeRepository.findAll();
	}

	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value = "id") Long employeeId)
			throws ResourceNotFoundException {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
		return ResponseEntity.ok().body(employee);
	}
	/*
	 * {
    "firstName":"admin",
    "lastName":"admin",
    "emailId":"admin@gmail.com",
    "address":"Mumbai",
    "contact":"9090909090",
    "department":"Training", 
    "designation":"Trainer",
    "salary":50000,
    "role":"admin",
    "password":"Admin@123"
}
	 */

	@PostMapping("/employees")
	public Employee createEmployee(@Valid @RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}

	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") Long employeeId,
			@Valid @RequestBody Employee employeeDetails) throws ResourceNotFoundException {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));

		employee.setEmailId(employeeDetails.getEmailId());
		employee.setLastName(employeeDetails.getLastName());
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setAddress(employeeDetails.getAddress());
		employee.setContact(employeeDetails.getContact());
		employee.setDepartment(employeeDetails.getDepartment());
		employee.setDesignation(employeeDetails.getDesignation());
		employee.setSalary(employeeDetails.getSalary());
		final Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	@DeleteMapping("/employees/{id}")
	public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Long employeeId)
			throws ResourceNotFoundException {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + employeeId));

		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@PostMapping("/employees/login")
	public Optional<Employee> loginEmployee(@Valid @RequestBody Employee employee) {
		
		return employeeRepository.findByEmailIdAndPassword(employee.getEmailId(), employee.getPassword());		
	}
	
	@PutMapping("/employees/forgetpassword")
	public ResponseEntity<Employee> forgetEmployeePassword(
			@Valid @RequestBody Employee employeeDetails) throws ResourceNotFoundException {
		Employee ee = employeeRepository.findByEmailId(employeeDetails.getEmailId());
		ee.setPassword(employeeDetails.getPassword());
		employeeRepository.save(ee);
		return ResponseEntity.ok(ee);
	}
}
