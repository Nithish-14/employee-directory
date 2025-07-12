package com.example.employeedirectory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class EmployeeController {

    private List<Map<String, String>> employees = new ArrayList<>();

    public EmployeeController() {
       employees.add(new HashMap<>(Map.of(
        "id", "1", "firstName", "John", "lastName", "Doe", "email", "john@example.com", "department", "HR", "role", "Manager"
    )));
    employees.add(new HashMap<>(Map.of(
        "id", "2", "firstName", "Jane", "lastName", "Smith", "email", "jane@example.com", "department", "IT", "role", "Developer"
    )));
    employees.add(new HashMap<>(Map.of(
        "id", "3", "firstName", "Alice", "lastName", "Brown", "email", "alice@example.com", "department", "Finance", "role", "Analyst"
    )));
    employees.add(new HashMap<>(Map.of(
        "id", "4", "firstName", "Bob", "lastName", "Williams", "email", "bob@example.com", "department", "IT", "role", "Support"
    )));
    }

@GetMapping("/")
public String dashboard(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String department,
        @RequestParam(required = false) String role,
        @RequestParam(required = false, defaultValue = "1") int page,
        Model model) {

    List<Map<String, String>> filtered = new ArrayList<>(employees);

    // Filter
    if (search != null && !search.isEmpty()) {
        String q = search.toLowerCase();
        filtered.removeIf(emp -> !(
                emp.get("firstName").toLowerCase().contains(q) ||
                emp.get("lastName").toLowerCase().contains(q) ||
                emp.get("email").toLowerCase().contains(q)
        ));
    }

    if (department != null && !department.isEmpty()) {
        filtered.removeIf(emp -> !emp.get("department").toLowerCase().contains(department.toLowerCase()));
    }

    if (role != null && !role.isEmpty()) {
        filtered.removeIf(emp -> !emp.get("role").toLowerCase().contains(role.toLowerCase()));
    }

    // Sort
    if (sortBy != null && !sortBy.isEmpty()) {
        filtered.sort(Comparator.comparing(emp -> emp.getOrDefault(sortBy, "")));
    }

    // Pagination
    int itemsPerPage = 5;
    int totalPages = (int) Math.ceil((double) filtered.size() / itemsPerPage);
    int start = (page - 1) * itemsPerPage;
    int end = Math.min(start + itemsPerPage, filtered.size());

    List<Map<String, String>> paginated = (start < filtered.size()) ? filtered.subList(start, end) : new ArrayList<>();

    model.addAttribute("employees", paginated);
    model.addAttribute("totalPages", totalPages);
    model.addAttribute("page", page);

    return "dashboard";
}


    @GetMapping("/form")
public String showForm(@RequestParam(required = false) String editId, Model model) {
    Map<String, String> employee = null;

    if (editId != null) {
        for (Map<String, String> emp : employees) {
            if (emp.get("id").equals(editId)) {
                employee = emp;
                break;
            }
        }
    }

    // If no employee found (add new), provide an empty map to avoid null error
    if (employee == null) {
        employee = new HashMap<>();
    }

    model.addAttribute("employee", employee);
    return "add-edit-form";
}


    @PostMapping("/save")
    public String saveEmployee(@RequestParam Map<String, String> formData) {
        String id = formData.get("id");

        for (Map<String, String> emp : employees) {
            if (emp.get("id").equals(id)) {
                emp.putAll(formData);
                return "redirect:/";
            }
        }

        if (id == null || id.isEmpty()) {
            formData.put("id", String.valueOf(System.currentTimeMillis()));
        }
        employees.add(formData);
        return "redirect:/";
    }


    @PostMapping("/delete")
    public String deleteEmployee(@RequestParam String id) {
        employees.removeIf(emp -> emp.get("id").equals(id));
        return "redirect:/";
    }
}
